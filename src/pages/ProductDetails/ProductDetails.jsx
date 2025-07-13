import React, { useEffect, useState } from "react";
import { FaArrowUp, FaFlag, FaStar } from "react-icons/fa";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import loadingLottie from '../../assets/loading.json';
import Lottie from 'lottie-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://tech-server-blush.vercel.app/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => navigate("/404"));

    axios
      .get(`https://tech-server-blush.vercel.app/api/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id, navigate]);

  const handleUpvote = async () => {
    if (!user) return navigate("/login");
    if (hasVoted || user?.email === product?.ownerEmail) return;

    try {
      const res = await axios.patch(
        `https://tech-server-blush.vercel.app/api/upvote/${id}`,
        { email: user.email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        setProduct((prev) => ({ ...prev, upvotes: prev.upvotes + 1 }));
        setHasVoted(true);
      }
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  const handleReport = async () => {
    if (!user) return navigate("/login");

    const { _id, ...restProduct } = product;

    try {
      const response = await axios.post("https://tech-server-blush.vercel.app/api/report", {
        ...restProduct,
        originalProductId: _id,
        reportedBy: {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
        },
      });

      if (response.data.insertedId) {
        Swal.fire("✅ Report Submitted!", "Admin will review it.", "success");
      }
    } catch (error) {
      console.error("Report submission error:", error);
      Swal.fire("❌ Error", "Could not report this product", "error");
    }
  };

  const handlePostReview = () => {
    if (!user) return navigate("/login");

    Swal.fire({
      title: "Post a Review",
      html: `
        <label class="block font-semibold mb-1">Reviewer Name</label>
        <input type="text" id="reviewerName" class="swal2-input" value="${user.displayName || ''}" readonly />
        <label class="block font-semibold mb-1 mt-3">Reviewer Image URL</label>
        <input type="text" id="reviewerImage" class="swal2-input" value="${user.photoURL || ''}" readonly />
        <label class="block font-semibold mb-1 mt-3">Review Description</label>
        <textarea id="reviewDescription" class="swal2-textarea" placeholder="Write your review here..."></textarea>
        <label class="block font-semibold mb-1 mt-3">Rating</label>
        <div id="starRating" style="font-size: 2rem; color: gray; user-select:none;">
          <span data-value="1" style="cursor:pointer;">&#9734;</span>
          <span data-value="2" style="cursor:pointer;">&#9734;</span>
          <span data-value="3" style="cursor:pointer;">&#9734;</span>
          <span data-value="4" style="cursor:pointer;">&#9734;</span>
          <span data-value="5" style="cursor:pointer;">&#9734;</span>
        </div>
        <input type="hidden" id="reviewRating" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Submit",
      didOpen: () => {
        const stars = Swal.getPopup().querySelectorAll("#starRating span");
        const ratingInput = Swal.getPopup().querySelector("#reviewRating");
        stars.forEach((star) => {
          star.addEventListener("click", () => {
            const value = star.getAttribute("data-value");
            ratingInput.value = value;
            stars.forEach((s, i) => {
              if (i < value) {
                s.innerHTML = "&#9733;";
                s.style.color = "gold";
              } else {
                s.innerHTML = "&#9734;";
                s.style.color = "gray";
              }
            });
          });
        });
      },
      preConfirm: () => {
        const description = Swal.getPopup().querySelector("#reviewDescription").value.trim();
        const rating = Swal.getPopup().querySelector("#reviewRating").value;

        if (!description) {
          Swal.showValidationMessage("Review description is required");
          return false;
        }
        if (!rating) {
          Swal.showValidationMessage("Rating is required");
          return false;
        }
        return { description, rating: Number(rating) };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const reviewData = {
          productId: id,
          reviewerName: user.displayName,
          reviewerImage: user.photoURL,
          description: result.value.description,
          rating: result.value.rating,
          timestamp: new Date(),
        };

        try {
          await axios.post("https://tech-server-blush.vercel.app/api/reviews", reviewData);
          Swal.fire("Success!", "Your review has been submitted.", "success");

          // Refresh reviews
          const res = await axios.get(`https://tech-server-blush.vercel.app/api/reviews/${id}`);
          setReviews(res.data);
        } catch (error) {
          Swal.fire("Error!", "Failed to submit review.", "error");
          console.error("Review submission error:", error);
        }
      }
    });
  };

  if (!product) return <Lottie className='my-10' animationData={loadingLottie} loop={true} />
  return (
    <div className="bg-blue-200 px-10 py-6 lg:px-48 lg:py-10 space-y-8">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />

        <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.productName}</h1>
        <p className="text-gray-700 mb-6">{product.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {product.tags.map((tag, i) => (
            <span key={i} className="badge badge-outline text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <a
          href={product.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600 hover:text-blue-800"
        >
          Visit Product Site
        </a>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleUpvote}
            disabled={user?.email === product.ownerEmail || hasVoted}
            className="cursor-pointer  bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition disabled:opacity-50"
          >
            <FaArrowUp />
            {product.upvotes} Upvote{product.upvotes !== 1 && "s"}
          </button>

          <button
            onClick={handlePostReview}
            className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-amber-100 px-8 py-3 text-lg rounded-lg"
          >
            Post a Review
          </button>

          <button
            onClick={handleReport}
            className="ml-auto text-red-600 hover:text-red-800 flex items-center gap-2"
          >
            <FaFlag /> Report
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">User Reviews</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Pagination]}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="p-5 border rounded-xl shadow bg-gray-50 h-full">
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={review.reviewerImage}
                      alt={review.reviewerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{review.reviewerName}</h4>
                      <p className="text-xs text-gray-500">
                        {new Date(review.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{review.description}</p>
                  <div className="flex text-yellow-500 text-lg">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
