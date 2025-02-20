import dayjs from "dayjs";

type Message = {
  createdAt: string;
  message: string;
  reciever: string
  sender: any;
  isRead: boolean;
  title: string;
  _id: string
}

type ComponentProps = {
  message: Message
}


export default function RecievedMessage({ message }: ComponentProps) {

  return (
    <div className={`flex flex-row w-full shadow-sm shadow-slate-300 items-start justify-between duration-150 gap-2  p-2 hover:cursor-pointer rounded-sm ${message.isRead ? "bg-orange-200 hover:bg-orange-100" : "bg-orange-300 hover:bg-orange-200"}`}>
      <div className="flex flex-col w-full justify-start items-start">
        <p className="font-logo text-xl text-orange-800 tracking-wider italic">{message.title}</p>
        <p className="text-orange-800 tracking-wide line-clamp-1 break-words overflow-hidden">{message.message}</p>
      </div>

      <div className="flex flex-col justify-start items-start text-nowrap">
        <p>{message.sender.name + ' ' + message.sender.surname}</p>
        <p className="text-sm italic">{dayjs(message.createdAt).format("DD/MM/YY") + ' ' + dayjs(message.createdAt).format("HH:mm")}</p>
      </div>
    </div>
  )
}