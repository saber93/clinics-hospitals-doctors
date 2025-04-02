
import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Dummy review data for demonstration purposes
const dummyReviews = [
  {
    id: '1',
    name: 'Alex Johnson',
    rating: 5,
    date: '2023-10-15',
    title: 'Great product, highly recommend!',
    comment: 'This product exceeded my expectations. The quality is outstanding and it works exactly as described. I would definitely buy again.',
    likes: 12,
    verified: true
  },
  {
    id: '2',
    name: 'Sarah Miller',
    rating: 4,
    date: '2023-09-28',
    title: 'Good value for money',
    comment: 'Pretty happy with my purchase. It does what it says and arrived quickly. The only small issue is that it was slightly smaller than I expected.',
    likes: 5,
    verified: true
  },
  {
    id: '3',
    name: 'Michael Brown',
    rating: 3,
    date: '2023-11-02',
    title: 'Decent but could be better',
    comment: 'Product is okay for the price. Shipping was fast but the packaging could be improved. It works as intended but nothing exceptional.',
    likes: 2,
    verified: false
  }
];

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews] = useState(dummyReviews);
  const [activeFilter, setActiveFilter] = useState('all');

  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  
  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const filteredReviews = activeFilter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(activeFilter));

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Summary section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-primary">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">{reviews.length} reviews</div>
          </div>
          
          {/* Rating breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <button 
                  onClick={() => setActiveFilter(activeFilter === String(rating) ? 'all' : String(rating))}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  <span className="w-3">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                </button>
                <div className="relative w-full h-2 bg-gray-200 rounded-full mx-2">
                  <div 
                    className="absolute top-0 left-0 h-2 bg-primary rounded-full"
                    style={{ width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-6 text-right">
                  {ratingCounts[rating] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Reviews list */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex flex-wrap gap-2">
            <Button 
              variant={activeFilter === 'all' ? "default" : "outline"}
              onClick={() => setActiveFilter('all')}
              size="sm"
            >
              All Reviews
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={activeFilter === String(rating) ? "default" : "outline"}
                onClick={() => setActiveFilter(activeFilter === String(rating) ? 'all' : String(rating))}
                size="sm"
                className="flex items-center"
              >
                {rating} <Star className="h-3 w-3 ml-1 fill-current" />
              </Button>
            ))}
          </div>
          
          {filteredReviews.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium">No reviews yet</h3>
              <p className="mt-1 text-gray-500">Be the first to review this product</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mt-3">{review.title}</h4>
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                    
                    <div className="flex items-center mt-4">
                      <Button variant="ghost" size="sm" className="text-gray-500">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.likes})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
