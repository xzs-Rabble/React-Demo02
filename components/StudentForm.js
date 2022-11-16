import React, { useState, useCallback, useContext } from "react";
import StuContext from "../store/StuContext";
import useFecth from "../hooks/useFecth";
import "./StudentForm.css";

const StudentForm = (props) => {
  const [inputData, setInputData] = useState({
    name: props.stu ? props.stu.attributes.name : "",
    age: props.stu ? props.stu.attributes.age : "",
    gender: props.stu ? props.stu.attributes.gender : "男",
    address: props.stu ? props.stu.attributes.address : "",
  });
  const [tipText, setTipText] = useState("添加");
  const ctx = useContext(StuContext);

  //添加&修改学生信息
  const {
    loading,
    error,
    fetchData: updateStu,
  } = useFecth(
    {
      url: props.stu ? `students/${props.stu.id}` : "students",
      method: props.stu ? "put" : "post",
    },
    ctx.fetchData
  );

  const nameChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, name: e.target.value }));
  };

  const ageChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, age: e.target.value }));
  };

  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, gender: e.target.value }));
  };

  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, address: e.target.value }));
  };

  const submitHandler = () => {
    //   console.log(inputData);
    setTipText("添加");
    updateStu(inputData);
  };

  //取消修改
  const onCancel = () => {
    props.onCancel();
  };
  //确认修改
  const onOk = () => {
    updateStu(inputData);
    setTipText("修改");
    props.onCancel();
  };
  return (
    <>
      <tr className="student-form">
        <td>
          <input
            onChange={nameChangeHandler}
            value={inputData.name}
            type="text"
          />
        </td>
        <td>
          <select onChange={genderChangeHandler} value={inputData.gender}>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </td>
        <td>
          <input
            onChange={ageChangeHandler}
            value={inputData.age}
            type="text"
          />
        </td>
        <td>
          <input
            onChange={addressChangeHandler}
            value={inputData.address}
            type="text"
          />
        </td>
        <td>
          {props.stu && (
            <>
              <button onClick={onCancel}>取消</button>
              <button onClick={onOk}>确认</button>
            </>
          )}
          {!props.stu && <button onClick={submitHandler}>添加</button>}
        </td>
      </tr>
      {loading && (
        <tr>
          <td colSpan={5}>正在{tipText}数据...</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5}>{tipText}失败...</td>
        </tr>
      )}
    </>
  );
};

export default StudentForm;
