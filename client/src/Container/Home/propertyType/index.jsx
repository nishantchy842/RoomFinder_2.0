import { Avatar } from "antd";
import styles from "./styles.module.scss";
export default function PropertyType() {
  const feature = [
    {
      icon: "",
      category: "Family House",
      totalRoom: 100,
    },
    {
      icon: "",
      category: "House & Villa",
      totalRoom: 100,
    },
    {
      icon: "",
      category: "Apartment",
      totalRoom: 100,
    },
    {
      icon: "",
      category: "Office & Studi",
      totalRoom: 100,
    },
  ];

  return (
    <div className={styles.propertyTypeContainer}>
      <p className=" text-center font-extrabold text-2xl font-sans">
        Featured Property Types
      </p>
      <p className=" text-center text-[#72809d] font-sans mb-5">
        Find All Type of Property
      </p>
      <div className="wrapper">
        {feature.map((item, id) => {
          return (
            <div key={id} className="card_theme">
              <Avatar size={"large"}>n</Avatar>
              <p className="category font-semibold mt-2.5 !text-base font-sans px-10">
                {item.category}
              </p>
              <p className=" font-sans text-[#2d3954]">
                {item.totalRoom} Property
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
