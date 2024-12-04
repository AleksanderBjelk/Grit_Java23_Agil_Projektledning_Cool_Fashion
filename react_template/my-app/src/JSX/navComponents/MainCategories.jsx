import React from "react";

const MainCategories = ({
    mainCategories,
    intermediateCategories,
    subCategories,
}) => {
    return (
        <>
            {mainCategories.map((mainCategory) => (
                <li key={mainCategory.id}>
                    <a href={`/category/${mainCategory.id}`}>
                        {mainCategory.name}
                    </a>
                    <ul className="dropdown">
                        {intermediateCategories
                            .filter(
                                (inter) =>
                                    inter.mainCategoryId === mainCategory.id
                            )
                            .map((intermediateCategory) => (
                                <li key={intermediateCategory.id}>
                                    <a
                                        href={`/category/${mainCategory.id}/${intermediateCategory.id}`}
                                    >
                                        {intermediateCategory.name}
                                    </a>
                                    <ul className="sub-dropdown">
                                        {subCategories
                                            .filter(
                                                (sub) =>
                                                    sub.intermediateCategoryId ===
                                                    intermediateCategory.id
                                            )
                                            .map((subCategory) => (
                                                <li key={subCategory.id}>
                                                    <a
                                                        href={`/category/${mainCategory.id}/${intermediateCategory.id}/${subCategory.id}`}
                                                    >
                                                        {subCategory.name}
                                                    </a>
                                                </li>
                                            ))}
                                    </ul>
                                </li>
                            ))}
                    </ul>
                </li>
            ))}
        </>
    );
};

export default MainCategories;
