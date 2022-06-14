import React, { useEffect, useState } from 'react';

const Detail_info = ({ student, major, stu_major_idx }) => {
  const div2 = student.map((item) => {
    return item.m_idx === stu_major_idx[0] ? (
      <div key={`stu_${item.m_idx}`} className="box_student">
        <p>ID : {item.m_id}</p>
        <p>
          이름 : {item.name} {item.m_human == 'M' ? '(남)' : '(여)'}
        </p>
        <p>나이 : {item.age}</p>
        <p>학년 : {item.grade}</p>
        <p>학과번호 : {item.major_idx}</p>
      </div>
    ) : (
      ''
    );
  });

  const div = major.map((item) => {
    return item.major_idx === stu_major_idx[1] ? (
      <div key={`major_${item.major_idx}`} className="box_major">
        <p>학과명 : {item.name}</p>
        <p>인원수 : {item.pers_num}</p>
        <p>학과 상세내용 : {item.summary}</p>
        {/*TODO: 학과 삭제 시 삭제 및 존재 했던 학생 기타로 이동, 학생 major_idx 수정, 학과 인원수 수정 */}
      </div>
    ) : (
      ''
    );
  });
  console.log(stu_major_idx);

  /**
   * RENDER
   */

  return (
    <>
      {div}
      {div2}
    </>
  );
};

Detail_info.defaultProps = {
  student: [],
  onClick: () => {},
  change_major: () => {},
};

export default Detail_info;
