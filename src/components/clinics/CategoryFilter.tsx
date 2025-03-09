
import React from "react";
import { Category } from "@/types/clinic";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  onSelectCategory: (categoryName: string | null) => void;
  onSelectSubCategory: (subCategoryName: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  selectedSubCategory,
  onSelectCategory,
  onSelectSubCategory,
}) => {
  return (
    <div className="w-full space-y-4">
      <h3 className="font-medium text-lg">Categories</h3>
      
      <div className="space-y-1 mb-4">
        <button
          onClick={() => {
            onSelectCategory(null);
            onSelectSubCategory(null);
          }}
          className={cn(
            "w-full text-left px-3 py-2 rounded-md transition-colors text-sm",
            !selectedCategory
              ? "bg-primary/10 text-primary font-medium"
              : "hover:bg-accent"
          )}
        >
          All Categories
        </button>
      </div>

      <Accordion type="multiple" defaultValue={[categories[0]?.id || ""]}>
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <div className="flex flex-col">
              <div 
                className="relative h-36 w-full mb-2 rounded-md overflow-hidden"
                onClick={() => {
                  onSelectCategory(
                    selectedCategory === category.name ? null : category.name
                  );
                  onSelectSubCategory(null);
                }}
              >
                <img 
                  src={category.imageUrl} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 left-0 p-3 text-white font-medium">
                    {category.name}
                  </div>
                </div>
              </div>
              <AccordionTrigger
                className={cn(
                  "px-3 py-2 rounded-md transition-colors text-sm hover:no-underline",
                  selectedCategory === category.name && !selectedSubCategory
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-accent"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCategory(
                    selectedCategory === category.name ? null : category.name
                  );
                  onSelectSubCategory(null);
                }}
              >
                View subcategories
              </AccordionTrigger>
            </div>
            <AccordionContent>
              <div className="pl-4 space-y-1 pt-1">
                {category.subCategories.map((subCategory) => (
                  <button
                    key={subCategory.id}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md transition-colors text-sm",
                      selectedCategory === category.name &&
                        selectedSubCategory === subCategory.name
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent"
                    )}
                    onClick={() => {
                      onSelectCategory(category.name);
                      onSelectSubCategory(
                        selectedSubCategory === subCategory.name
                          ? null
                          : subCategory.name
                      );
                    }}
                  >
                    {subCategory.name}
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CategoryFilter;
