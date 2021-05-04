export default function Target({ target }) {
  console.log(target);
  return (
    <ul>
      {target.length > 0 &&
        target.map((t, index) => {
          console.log(index);
          return <li key={index}>{t}</li>;
        })}
    </ul>
  );
}
