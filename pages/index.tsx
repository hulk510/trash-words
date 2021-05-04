import { useReducer, useState } from "react";
import Target from "./target";

// 最初に型で値の部分に型を入れれない
const initialState: {
  target: string[];
} = { target: [] };

// Interfaceとの違いってなんなんやろ？
type State = {
  target: string[];
  text: string;
};

// このStateって何がくるかわからないけどわからなくて良くて何がくれば良いかを定義すれば良いんやろうな。
// そうすれば自然と他のやつとかは弾いてくれる
// それも必要なんやったら追加すれば良いだけ。
function reducer(state: State, action) {
  switch (action.type) {
    case "add":
      console.log(action.text);
      state.target.push(action.text);
      return { target: state.target };
    // case "delete":
    //   return { target: state.target.remove(state.text) };
    default:
      throw new Error();
  }
}

export default function Home() {
  const [text, setText] = useState("");
  const [props, dispatch] = useReducer(reducer, initialState);
  console.log(props.target);
  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "add", text: text });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          テキストを入れてね
          <textarea value={text} onChange={handleChange} />
        </label>
        <input type="submit" value="submit" />
      </form>
      {/* useStateやと関数が更新されないと値が反映されないけどreducerだと更新してくれるのか知らんけどちゃんとこれでも登録したら出してくれる。 */}
      <Target target={props.target} />
    </>
  );
}
