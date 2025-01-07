import dayjs from "dayjs";

type Message = {
  createdAt: string;
  message: string;
  reciever: string
  sender: any;
  title: string;
  _id: string
}

type ComponentProps = {
  message: Message
}


export default function RecievedMessage({ message }: ComponentProps) {
  return (
    <div className="flex flex-col w-full items-start justify-start duration-150 gap-2 bg-orange-200 p-2 hover:bg-orange-300 hover:cursor-pointer">
      <div className="flex w-full justify-between items-start">
        <p className="font-logo text-xl text-orange-800 tracking-wider italic">{message.title}</p>
        <p>{message.sender.name + ' ' + message.sender.surname}</p>
      </div>

      <div className="flex w-full justify-between items-start text-nowrap">
        <div className="flex space-x-4 text-ellipsis">
          <p className="text-orange-800 tracking-wide line-clamp-1 break-words overflow-hidden">{message.message}</p>
        </div>

        <div className="flex">
          <p className="text-sm italic">{dayjs(message.createdAt).format("DD/MM/YY") + ' ' + dayjs(message.createdAt).format("HH:mm")}</p>
        </div>
      </div>
    </div>
  )
}