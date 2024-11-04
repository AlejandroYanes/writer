interface Props {
  children: React.ReactNode;
}

export default function Block(props: Props) {
  return (
    <div className="bg-gray-200 p-3 rounded-md flex flex-col justify-center items-center">
      {props.children}
    </div>
  );
}
