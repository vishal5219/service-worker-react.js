import axios from "axios";
import React, { useEffect, useState } from "react";

const About = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    try {
      axios.get('https://jsonplaceholder.typicode.com/todos/2')
        .then((res) => {
          setData(res.data);
          localStorage.setItem("userData", JSON.stringify(res.data))
        }).catch((err) => {
          setData(JSON.parse(localStorage.getItem("userData")))
        })
    } catch (error) {
      console.log("error");
    }
  }, []);

  return <>
    <p>About Page</p>
    <div>
      <p>{data?.title}</p>
    </div>
  </>;
};

export default About;
