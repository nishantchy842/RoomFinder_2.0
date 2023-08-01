import { Avatar } from "antd";
import { styles } from "../../../Utils/Style";
export default function CommentSection() {
  const array = [
    {
      image: "n",
      name: "nisant",
      comment: "nice room ... ",
    },
    {
      image: "n",
      name: "nisant",
      comment: "nice room ... ",
    },
    {
      image: "n",
      name: "nisant",
      comment: "nice room ... ",
    },
  ];
  return (
    <div className={`${styles.paddingY} min-h-screen w-[70%] `}>
      <p className={`${styles.heroSubHeadText} capitalize`}>comments</p>
      <div className={` w-[100%] p-2 flex flex-col gap-y-2`}>
        {array.map((item, id) => {
          return (
            <div key={id}>
              <div className="name_image_wrapper flex gap-x-2">
                <Avatar>n</Avatar>
                <p>by {item.name}</p>
              </div>
              <p className="">{item.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
