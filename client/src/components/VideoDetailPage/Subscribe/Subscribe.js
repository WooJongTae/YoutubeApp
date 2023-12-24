import axios from "axios";
import React, { useEffect, useState } from "react";

function Subscribe({ userTo, userFrom, videoId }) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    console.log(userFrom);
    const variable = { userTo };
    axios.post("/api/subscribe/subscribeNumber", variable).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
        console.log(res.data);
      } else {
        alert("구독 정보 가져오기 실패");
      }
    });
    const subscribedVariable = {
      userTo,
      userFrom,
    };
    console.log(subscribedVariable);
    axios.post("/api/subcribe/subscribed", subscribedVariable).then((res) => {
      if (res.data.success) {
        setSubscribed(res.data.subscribed);
        console.log(res.data);
      } else {
        alert("정보를 받아오지 못함");
      }
    });
  }, []);

  const onSubscribe = () => {
    const subscribedVariable = {
      userTo,
      userFrom,
      //   모델링을 수정해서 페이지 주소로 type 추가해서 해결해야할듯
    };
    if (Subscribed) {
      console.log(subscribedVariable);
      axios
        .post("/api/subscribe/unSubscribe", subscribedVariable)
        .then((res) => {
          if (res.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
            console.log(res.data);
          } else {
            alert("구독 취소하는데 실패");
          }
        });
    } else {
      axios.post("/api/subscribe/subscribe", subscribedVariable).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독하는데 실패");
        }
      });
    }
  };
  return (
    <div>
      <button onClick={onSubscribe}>
        {SubscribeNumber} {Subscribed ? "구독" : "구독하세요"}
      </button>
    </div>
  );
}

export default Subscribe;
