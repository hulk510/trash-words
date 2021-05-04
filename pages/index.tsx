import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
} from "@material-ui/core";
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
  // const { target } = props; とかでいろんなpropsを返しながらpropsとして取得するreduxみたいな感じでできる。
  console.log(props.target);
  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "add", text: text });
  }

  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={3}>
        {/* ここはGridを使うべきかCardを使うべきかとかわかりづらいなぁーなんか色々トレースしながら作ってみて覚えるしかないかも。 */}
        {/* 基本的にレイアウト関係とかちょっとめんどくさいところとかに使って細かいところはuseStyleとか使ってnextjsのcssmoduleみたいに動かすのかな？cssで指定するのとmaterial-uiのuseStyleって何が違うの？既存のcssを修正できるから使ってるんかな？ */}
        <Card>
          <Container>
            <CardContent>
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                spacing={3}
              >
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="my-input">テキスト入力欄</InputLabel>
                    <Input
                      id="my-input"
                      aria-describedby="my-helper-text"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <Button color="primary" onClick={handleSubmit}>
                    表示するよー
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Container>
        </Card>
        {/* <form onSubmit={handleSubmit}>
          <label>
            テキストを入れてね
            <textarea value={text} onChange={handleChange} />
          </label>
          <input type="submit" value="submit" />
        </form> */}
      </Grid>
      <Grid item xs={3}>
        {/* useStateやと関数が更新されないと値が反映されないけどreducerだと更新してくれるのか知らんけどちゃんとこれでも登録したら出してくれる。 */}
        <Target target={props.target} />
      </Grid>
    </Grid>
  );
}
