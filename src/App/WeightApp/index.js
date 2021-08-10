import React, { useEffect, useState } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { auth, firestore } from "../../firebase";
import { Redirect } from "react-router-dom";

import { FaEdit, FaTrash } from "react-icons/fa";

function WeightApp() {
  const [isAuth, setAuth] = useState(null);
  const [uid, setUId] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState("");
  const docId = uuidv4();

  const dbRef = firestore.collection("UserWeights");

  useEffect(() => {
    var unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
        setUId(user.uid);
      } else {
        setAuth(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [uid]);

  useEffect(() => {
    dbRef
      .orderBy("createdAt", "desc")
      .where("userId", "==", uid)
      .onSnapshot((querySnapshot) => {
        const queryData = querySnapshot.docs.map((doc) => doc.data());
        setData(queryData);
      });
  }, [uid]);

  const signOut = () => {
    auth.signOut().then(() => {
      setAuth(false);
    });
  };

  if (isAuth === null) {
    return null;
  }

  if (isAuth === false) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editId === "") {
      dbRef
        .doc(docId)
        .set({
          id: docId,
          userId: uid,
          weight: userWeight,
          createdAt: new Date(),
        })
        .then(() => {
          setUserWeight("");
          setEditId("");
          alert("Weight Submit Successfully.");
        })
        .catch((e) => {
          console.log(e);
          alert("Something Went Wrong! Try Again.");
        });
    } else {
      dbRef
        .doc(editId)
        .update({
          weight: userWeight,
        })
        .then(() => {
          setUserWeight("");
          setEditId("");
          alert("Weight Edit Successfully.");
        })
        .catch((e) => {
          console.log(e);
          alert("Something Went Wrong! Try Again.");
        });
    }
  };

  const handleEdit = (id, weight) => {
    setEditId(id);
    setUserWeight(weight);
  };

  const handleDelete = (id) => {
    dbRef
      .doc(id)
      .delete()
      .then(() => {
        alert("Weight Deleted Successfully");
      })
      .catch(() => {
        alert("Something Went Wrong! Try Again.");
      });
  };

  return (
    <div>
      <div className="navbar">
        <p>Weight Tracker App</p>
        <button className="logoutBtn" onClick={signOut}>
          logout
        </button>
      </div>

      <div className="body">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="weightInput"
            placeholder="Weight"
            value={userWeight}
            onChange={(e) => setUserWeight(e.target.value)}
          />
          <button className="weightSubmitBtn">Submit</button>
        </form>

        <div className="tableDiv">
          <table className="table">
            <thead>
              <tr className="tableTr">
                <th className="tabletd">Date</th>
                <th className="tabletd">Time</th>
                <th className="tabletd">Weight</th>
                <th className="tabletd"></th>
                <th className="tabletd"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr className="tableTr" key={item.id}>
                  <td className="tabletd">
                    {item.createdAt.toDate().toDateString()}
                  </td>
                  <td className="tabletd">
                    {item.createdAt.toDate().toLocaleTimeString("en-US")}
                  </td>
                  <td className="tabletd">{item.weight}</td>
                  <td className="tabletd">
                    <FaEdit
                      className="editIcon"
                      onClick={() => handleEdit(item.id, item.weight)}
                    />
                  </td>
                  <td className="tabletd">
                    <FaTrash
                      className="deleteIcon"
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WeightApp;
