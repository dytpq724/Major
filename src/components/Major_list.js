import React, { useEffect, useState } from 'react';
import './Major_list.css';

const Major_list = ({ major, new_major_idx, show_stu, del_mjr, onClick }) => {
  //TODO: 학과리스트 구현
  const div =
    major.length < 1 ? (
      <h2>학과가 없습니다...</h2>
    ) : (
      major.map((item) => (
        <div
          key={`major_${item.major_idx}`}
          onClick={() => show_stu(item.major_idx)}
          className="box_major"
        >
          <p>학과명 : {item.name}</p>
          <p>인원수 : {item.pers_num}</p>
          {/*TODO: 학과 삭제 시 삭제 및 존재 했던 학생 기타로 이동, 학생 major_idx 수정, 학과 인원수 수정 */}
          {item.major_idx === 0 ? (
            ''
          ) : (
            <button onClick={() => del_mjr(item.major_idx)}>학과 삭제</button>
          )}
        </div>
      ))
    );
  const [show_form, setShow_form] = useState(false); // show & hide form
  const [new_major, setNew_major] = useState({
    name: '',
    pers_num: 0,
    summary: '',
  });

  /* 학생 추가 입력폼 onChange */
  const handlechange = (evt) => {
    // console.log(evt.target.type);
    const value = evt.target.value;
    setNew_major({
      ...new_major,
      [evt.target.name]: value,
    });
  };

  const add_major = () => {
    show_add_form();
    const id_check = major.findIndex((mjr) => mjr.name === new_major.name);
    let empty = 0;
    const keys = Object.keys(new_major);
    keys.forEach((key) => {
      if (new_major[key] === '' || keys.length < 2) {
        empty = 1;
        console.log('empyt=1');
        console.log(key);
        console.log(keys);
        console.log(new_major[key]);
        return;
      }
    });

    if (empty === 1) {
      alert('빈칸을 채워주세요...');
      return;
    } else if (id_check !== -1) {
      alert('학과 이름이 중복됩니다.');
      setNew_major({
        ...new_major,
        name: '',
      });
    } else {
      onClick(new_major);
    }
  };

  const show_add_form = () => {
    show_form ? setShow_form(false) : setShow_form(true);
  };

  useEffect(() => {
    if (new_major.major_idx !== new_major_idx) {
      setNew_major({
        ...new_major,
        major_idx: new_major_idx,
      });
    }
  }, [new_major_idx]);

  /* 학과추가 입력폼 */
  const add_info = (
    <div className="form_add">
      학과 추가 form
      <label>
        <input
          onChange={handlechange}
          value={new_major.name}
          name="name"
          type="text"
          placeholder="학과 이름을 입력하세요"
        />
      </label>
      <label>
        <textarea
          onChange={handlechange}
          value={new_major.summary}
          name="summary"
          type="text"
          placeholder="학과 소개를 입력하세요"
        />
      </label>
      <button onClick={show_add_form}>취소하기</button>
      <button onClick={add_major}>추가하기</button>
    </div>
  );

  /**
   * RENDER
   */

  return (
    <>
      <div className="add_button">
        <button onClick={() => show_add_form()}>학과 추가</button>
      </div>
      {div}
      {show_form ? add_info : ''}
    </>
  );
};

Major_list.defaultProps = {
  major: [],
  onClick: () => {},
};

export default Major_list;
