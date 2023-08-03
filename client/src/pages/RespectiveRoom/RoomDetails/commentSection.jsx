import { Avatar, Button, Form, Input } from "antd";
import { styles } from "../../../Utils/Style";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const { TextArea } = Input;
export default function CommentSection({ item, handleSingleRoom }) {
  const { comments = [], _id } = item || {};
  const { id, username } = useSelector((state) => state.user);
  const [comment, setCommnet] = useState(true);
  const onFinish = async (values) => {
    console.log("Success:", values);
    const { data } = await axios.put(`http://localhost:8000/api/room/comment`, {
      text: values.comment,
      postId: _id,
    });
    if (data.success) {
      setCommnet(!comment);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={`${styles.paddingY} min-h-screen w-[70%] `}>
      <p className={`${styles.heroSubHeadText} capitalize`}>comments</p>
      <div className={` w-[100%] p-2 flex flex-col gap-y-2`}>
        {comments.map((item, id) => {
          return (
            <div key={id} className="flex items-center gap-x-7">
              <Avatar>n</Avatar>
              <div className="name_image_wrapper flex flex-col gap-y-2">
                <p>by {item.postedBy}</p>
                <p className="">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="comment"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={4} placeholder="write comment" />
        </Form.Item>

        <Form.Item>
          <button className="btn" type="submit">
            Comment
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}
CommentSection.propTypes = {
  item: PropTypes.object,
  handleSingleRoom: PropTypes.func,
};
