export default function AuctionChatInputField() {
  return (
    <form className="flex w-full justify-between items-center">
      <input placeholder="Type Your Message" className="p-3 bg-orange-100 border border-orange-800 w-4/5 text-orange-800 font-semibold outline-none" />
      <button className="h-full px-3 bg-orange-800 text-white font-logo duration-100 rounded-sm hover:bg-orange-300 hover:text-orange-800">Send Message</button>
    </form>
  )
}