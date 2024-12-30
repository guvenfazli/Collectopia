type ComponentProps = {
  customFor: string;
  label: string;
}


export default function EditFormLabel({customFor, label}: ComponentProps) {
  return (
    <label className="text-lg font-logo tracking-widest -mb-4" htmlFor={customFor}>{label}</label>
  )
}