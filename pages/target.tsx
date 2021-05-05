import { Grid } from "@material-ui/core";
import { motion } from "framer-motion";

// framer-motionとmaterial-uiを一緒に使うには？
// https://stackoverflow.com/questions/65251600/how-to-use-framer-motion-with-material-ui-reactjsmaterial-ui-coreframer-m

export default function Target({ target, controls, onChangeHandler }) {
  console.log(target);
  return (
    <motion.div style={{ height: "25rem", width: "30rem", overflow: "hidden" }}>
      <Grid container direction="column" justify="center" alignItems="center">
        {target.length > 0 &&
          target.map((t, index) => {
            console.log(index);
            return (
              <Grid item key={index}>
                <motion.h1
                  // animate={controls}
                  // opacityが0になったら配列から要素を消したい。
                  initial={{ scale: 1 }}
                  animate={{ scale: 0 }}
                  onAnimationComplete={(definition) => {
                    console.log("Completed animating", definition);
                    // animationが完了しないタイミングがあるのはなぜ？
                    // 新しいanimationができたら消えてしまう。
                    onChangeHandler();
                  }}
                  transition={{ duration: 2 }}
                  // transition={{ duration: 2, repeat: Infinity }}
                >
                  {t}
                </motion.h1>
              </Grid>
            );
          })}
      </Grid>
    </motion.div>
  );
}
