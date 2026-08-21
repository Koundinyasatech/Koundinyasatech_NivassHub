function CategoryBadge({ category }) {
  const getClassName = () => {
    switch (category) {
      case "Milk / Newspaper":
        return "category-badge milk";

      case "Cab Service":
        return "category-badge cab";

      case "Utility":
        return "category-badge utility";

      default:
        return "category-badge";
    }
  };

  return (
    <span className={getClassName()}>
      <span className="category-dot"></span>
      {category}
    </span>
  );
}

export default CategoryBadge;