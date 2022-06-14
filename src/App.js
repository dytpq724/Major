import { useState, useEffect } from 'react';
import './App.css';
import Major_list from './components/Major_list';
import Student_list from './components/Student_list';
import Detail_info from './components/Detail_info';

function App() {
  const [major, setMajor] = useState([
    {
      major_idx: 0,
      name: '기타',
      pers_num: 0,
      summary: '기타학과입니다..',
    },
    {
      major_idx: 1,
      name: '컴퓨터공학',
      pers_num: 2,
      summary: '우리학과는 컴퓨터공학과 ㅎㅎ',
    },
    {
      major_idx: 2,
      name: '디자인/마케팅',
      pers_num: 0,
      summary: '우리학과는 디자인/마케팅학과 ㅎㅎ',
    },
    {
      major_idx: 3,
      name: '경영/회계',
      pers_num: 1,
      summary: '우리학과는 경영/회계학과 ㅎㅎ',
    },
  ]);

  const [student, setStudent] = useState([
    {
      major_idx: 1,
      m_idx: 1,
      m_id: '1',
      name: '김길동',
      age: 22,
      grade: 1,
      m_human: 'M',
    },
    {
      major_idx: 1,
      m_idx: 2,
      m_id: '2',
      name: '이길동',
      age: 24,
      grade: 3,
      m_human: 'M',
    },
    {
      major_idx: 3,
      m_idx: 3,
      m_id: '3',
      name: '홍길동',
      age: 24,
      grade: 4,
      m_human: 'F',
    },
  ]);

  let new_m_idx = student[student.length - 1].m_idx + 1; // 새로추가되는 학생 m_idx
  let new_major_idx = major[major.length - 1].major_idx + 1; // 새로추가되는 학과 major_idx
  let new_ets_pers_num = major[0].pers_num;

  const [major_idx_stu, setMajor_idx_stu] = useState(0); // show & hide form
  const [stu_major_idx, setStu_major_idx] = useState([]); // show & hide form

  const show_stu = (major_idx) => {
    setMajor_idx_stu(major_idx);
  };
  const show_stu_detail = (m_idx, major_idx) => {
    setStu_major_idx([m_idx, major_idx]);
  };

  const handleClick = (new_student) => {
    setStudent(student.concat(new_student));
    const mjr_idx = major.findIndex(
      (mjr) => mjr.major_idx === new_student.major_idx
    );
    new_m_idx = new_m_idx + 1;

    /* 인원수 변경 set 
      + 학생 증가 시
    */
    setMajor((state) =>
      state.map((item) => {
        if (item.major_idx === new_student.major_idx) {
          return { ...item, pers_num: item.pers_num + 1 };
        }
        return item;
      })
    );
  };
  const handleMajor = (new_major) => {
    setMajor(major.concat(new_major));
    new_major_idx = new_major_idx + 1;
  };

  const change_major = (change_major_evt) => {
    /*TODO: 학생 major_idx 수정, 학과 인원수 수정 */

    /* 인원수 변경 set 
      + 학생 변경 시
    */
    if (change_major_evt.c_major_idx === change_major_evt.pre_major_idx) {
      alert('학과가 동일해서 변경할수 없습니다.');
    } else {
      setMajor((state) =>
        state.map((item) => {
          if (item.major_idx === change_major_evt.c_major_idx) {
            return { ...item, pers_num: item.pers_num + 1 };
          } else if (item.major_idx === change_major_evt.pre_major_idx) {
            return { ...item, pers_num: item.pers_num - 1 };
          }
          return item;
        })
      );

      //학생 학과데이터 변경
      setStudent((state) =>
        state.map((item) => {
          if (item.m_idx === change_major_evt.c_m_idx) {
            return { ...item, major_idx: change_major_evt.c_major_idx };
          }
          return item;
        })
      );
    }
  };

  const del_stu = (m_idx, major_idx) => {
    /*TODO: 학생 데이터 삭제, 학과 인원수 수정 */

    /* 인원수 변경 set 
      + 학생 삭제 시
    */
    //학생 데이터 삭제
    const newStudent = student.filter((item) => item.m_idx !== m_idx);
    setStudent(newStudent);

    //학과 인원수 수정
    setMajor((state) =>
      state.map((item) => {
        if (item.major_idx === major_idx) {
          return { ...item, pers_num: item.pers_num - 1 };
        }
        return item;
      })
    );
  };

  const del_mjr = (major_idx) => {
    /*TODO: 학과 삭제 시 삭제 및 존재 했던 학생 기타로 이동, 학생 major_idx 수정, 학과 인원수 수정 */
    const delMajor = major.filter((item) => item.major_idx !== major_idx);
    setMajor(delMajor);

    //학생 학과데이터 변경
    setStudent((state) =>
      state.map((item) => {
        if (item.major_idx === major_idx) {
          new_ets_pers_num = new_ets_pers_num + 1;
          return { ...item, major_idx: 0 };
        }
        return item;
      })
    );

    //기타학과 인원수 수정
    setMajor((state) =>
      state.map((item) => {
        if (item.major_idx === 0) {
          return { ...item, pers_num: new_ets_pers_num };
        }
        return item;
      })
    );
  };
  // console.log(student);
  // console.log(`new_m_idx : ${new_m_idx}`)

  console.log(major);
  console.log(`new_major_idx : ${new_major_idx}`);

  return (
    <div className="App">
      <h1>학생관리 프로그램</h1>
      <div className="App_row">
        <div>
          <h2>학과목록</h2>
          <Major_list
            major={major}
            new_major_idx={new_major_idx}
            del_mjr={del_mjr}
            show_stu={show_stu}
            onClick={handleMajor}
          />
        </div>
        <div>
          <h2>학생 목록</h2>
          <Student_list
            student={student}
            major={major}
            new_m_idx={new_m_idx}
            major_idx_stu={major_idx_stu}
            show_stu_detail={show_stu_detail}
            change_major={change_major}
            del_stu={del_stu}
            onClick={handleClick}
          />
        </div>
        <div>
          <h2>상세보기</h2>
          <Detail_info
            student={student}
            major={major}
            stu_major_idx={stu_major_idx}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
