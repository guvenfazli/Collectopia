import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ResponseMessage() {
  return (
    <Dialog >

      <DialogTrigger className="w-full" asChild>
        <button className="p-1 bg-orange-800 duration-100 font-logo text-white px-3 rounded-sm hover:bg-orange-700">Response</button>
      </DialogTrigger>

      <DialogContent className="bg-orange-50 text-lg text-orange-800 flex flex-col border border-orange-800 w-1/3">
        <DialogHeader>
          <DialogTitle className="font-logo tracking-widest text-xl">Response</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 w-full justify-start items-start">
          <p>TEST</p>
        </div>
      </DialogContent>

    </Dialog>
  )
}