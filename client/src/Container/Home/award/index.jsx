import { Avatar } from "antd";
import styles from "./styles.module.scss";
export default function Award() {
  const award = [
    {
      icon: "n",
      total: 32,
      name: "Blue Burmin Award",
    },
    {
      icon: "n",
      total: 32,
      name: "Blue Burmin Award",
    },
    {
      icon: "n",
      total: 32,
      name: "Blue Burmin Award",
    },
    {
      icon: "n",
      total: 32,
      name: "Blue Burmin Award",
    },
  ];
  return (
    <div className={styles.award_main_container}>
      <div className="award_wrapper">
        <p className="our_award text-center text-[#27ae60]">Our Awards</p>
        <p className="info">
          Over 1,24,000+ Happy User Bieng With Us Still They Love Our Services
        </p>
        <div className="flex justify-evenly w-full">
          {award.map((item, id) => {
            return (
              <div
                key={id}
                className="flex flex-col justify-center items-center"
              >
                <div className="icon">
                  <Avatar />
                </div>
                <p className="total font-sans">{item.total} M</p>
                <p className="name font-sans">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
