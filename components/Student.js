import React, { useState, useCallback, useContext } from "react";
import useFecth from "../hooks/useFecth";
import StuContext from "../store/StuContext";
import StudentForm from "./StudentForm";

const Student = (props) => {
  // {stu:{name, age, gender, address}} = props

  const [isEdit, setIsEdit] = useState(false);

  const ctx = useContext(StuContext);

  const {
    loading,
    error,
    fetchData: delStu,
  } = useFecth(
    {
      url: `students/${props.stu.id}`,
      method: "delete",
    },
    ctx.fetchData
  );

  const deleteHandler = () => {
    //删除学生
    delStu();
  };

  //取消修改
  const cancelHandler = () => {
    setIsEdit(false);
  };

  return (
    <>
      {!isEdit && (
        <tr>
          <td>{props.stu.attributes.name}</td>
          <td>{props.stu.attributes.gender}</td>
          <td>{props.stu.attributes.age}</td>
          <td>{props.stu.attributes.address}</td>
          <td>
            <button onClick={deleteHandler}>删除</button>
            <button
              onClick={() => {
                setIsEdit(true);
              }}
            >
              修改
            </button>
          </td>
        </tr>
      )}

      {isEdit && <StudentForm stu={props.stu} onCancel={cancelHandler} />}

      {loading && (
        <tr>
          <td colSpan={5}>正在删除数据...</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5}>删除失败...</td>
        </tr>
      )}
    </>
  );
};

export default Student;
