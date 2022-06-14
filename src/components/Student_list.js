import React, { useEffect, useState } from 'react';
import './Student_list.css';

const Student_list = ({
  student,
  major,
  new_m_idx,
  major_idx_stu,
  show_stu_detail,
  change_major,
  del_stu,
  onClick,
}) => {
  //TODO: 학과리스트 구현

  const [show_c_form, setShow_c_form] = useState(false); // show & hide form

  const show_add_c_form = (m_idx, major_idx) => {
    show_c_form ? setShow_c_form(false) : setShow_c_form(true);
    setChange_major_evt({
      ...change_major_evt,
      c_m_idx: m_idx,
      pre_major_idx: major_idx,
    });
  };

  const [change_major_evt, setChange_major_evt] = useState({
    c_m_idx: 0,
    c_major_idx: 1,
    pre_major_idx: 0,
  });

  const majorselect = (evt) => {
    const value = parseInt(evt.target.value);
    setChange_major_evt({
      ...change_major_evt,
      c_major_idx: value,
    });
  };
  // console.log(change_major_evt)

  //변경완료 클릭시 폼 숨김 + 변경
  const change_major_submit = () => {
    show_add_c_form(0, 0);
    change_major(change_major_evt);
  };

  const add_c_info = (
    <div>
      <label>
        학과를 선택하세요
        <select
          onChange={(evt) => majorselect(evt)}
          name="major_idx"
          value={change_major_evt.c_major_idx}
        >
          {major.map((item) => (
            <option key={item.major_idx} value={item.major_idx}>
              {' '}
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => change_major_submit()}>변경완료</button>
    </div>
  );

  const div =
    student.length < 1 ? (
      <h2>학생이 없습니다...</h2>
    ) : (
      student.map((item) =>
        item.major_idx === major_idx_stu ? (
          <div
            key={`stu_${item.m_idx}`}
            onClick={() => show_stu_detail(item.m_idx, item.major_idx)}
            className="box_student"
          >
            <p>ID : {item.m_id}</p>
            <p>
              이름 : {item.name} {item.m_human == 'M' ? '(남)' : '(여)'}
            </p>
            {/* <p>나이 : {item.age}</p> */}
            {/* <p>학년 : {item.grade}</p> */}
            {/* <p>학과번호 : {item.major_idx}</p> */}
            {/*TODO: 학생 삭제 시 학생 삭제, 학과 인원수 수정 */}
            <button onClick={() => del_stu(item.m_idx, item.major_idx)}>
              학생 삭제
            </button>
            <button onClick={() => show_add_c_form(item.m_idx, item.major_idx)}>
              학과 변경
            </button>
            {show_c_form ? add_c_info : ''}
          </div>
        ) : (
          ''
        )
      )
    );
  const [show_form, setShow_form] = useState(false); // show & hide form
  const [new_student, setNew_student] = useState({
    major_idx: 1,
  });

  /* 학생 추가 입력폼 onChange */
  const handlechange = (evt, type = 'text') => {
    // console.log(evt.target.type);
    const value =
      type === 'number' && evt.target.value !== ''
        ? parseInt(evt.target.value)
        : evt.target.value;

    setNew_student({
      ...new_student,
      [evt.target.name]: value,
    });
  };

  const add_student = () => {
    show_add_form();
    const id_check = student.findIndex((stu) => stu.m_id === new_student.m_id);
    let empty = 0;
    const keys = Object.keys(new_student);
    keys.forEach((key) => {
      if (new_student[key] === '' || keys.length < 7) {
        empty = 1;
        console.log('empyt=1');
        console.log(key);
        console.log(keys);
        console.log(new_student[key]);
        return;
      }
    });

    if (empty === 1) {
      alert('빈칸을 채워주세요...');
      return;
    } else if (id_check !== -1) {
      alert('ID값이 중복됩니다.');
      setNew_student({
        ...new_student,
        m_id: '',
      });
    } else {
      onClick(new_student);
    }
  };

  const show_add_form = () => {
    show_form ? setShow_form(false) : setShow_form(true);
  };

  useEffect(() => {
    if (new_student.m_idx !== new_m_idx) {
      setNew_student({
        ...new_student,
        m_idx: new_m_idx,
      });
    }
  }, [new_m_idx]);

  /* 학생추가 입력폼 */
  const add_info = (
    <div className="form_add">
      <h3>학생 추가 form</h3>
      <label>
        <input
          onChange={handlechange}
          value={new_student.m_id}
          name="m_id"
          type="text"
          placeholder="아이디를 입력하세요"
        />
      </label>
      <label>
        <input
          onChange={handlechange}
          value={new_student.name}
          name="name"
          type="text"
          placeholder="이름을 입력하세요"
        />
      </label>
      <label>
        <input
          onChange={(evt) => handlechange(evt, 'number')}
          value={new_student.age}
          name="age"
          type="text"
          placeholder="나이을 입력하세요"
        />
      </label>
      <label>
        <input
          onChange={(evt) => handlechange(evt, 'number')}
          value={new_student.grade}
          name="grade"
          type="text"
          placeholder="학년을 입력하세요"
        />
      </label>
      {/* <input onChange={handlechange} value={new_student.m_human} name = "m_human" type="text" placeholder="성별을 입력하세요"/> */}
      <div className="radio_div">
        <label>
          남
          <input
            type="radio"
            name="m_human"
            value="M"
            checked={new_student.m_human === 'M'}
            onChange={handlechange}
          />
        </label>
        <label>
          여
          <input
            type="radio"
            name="m_human"
            value="F"
            checked={new_student.m_human === 'F'}
            onChange={handlechange}
          />
        </label>
      </div>
      <label className="select_div">
        <select
          onChange={(evt) => handlechange(evt, 'number')}
          name="major_idx"
          value={new_student.major_idx}
        >
          {major.map((item) => (
            <option key={item.major_idx} value={item.major_idx}>
              {' '}
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <div>
        <button onClick={show_add_form}>취소하기</button>
        <button onClick={add_student}>추가하기</button>
      </div>
    </div>
  );

  // console.log(new_student);

  /**
   * RENDER
   */

  return (
    <>
      <div className="add_button">
        <button onClick={() => show_add_form()}>학생 추가</button>
      </div>
      {div}
      {show_form ? add_info : ''}
    </>
  );
};

Student_list.defaultProps = {
  student: [],
  onClick: () => {},
  change_major: () => {},
};

export default Student_list;
