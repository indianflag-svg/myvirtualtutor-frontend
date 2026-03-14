"use client"

export default function UploadButton({ onUpload }) {

  async function handleFile(e){
    const file = e.target.files[0]
    if(!file) return

    const formData = new FormData()
    formData.append("image", file)

    const res = await fetch("https://myvirtualtutor-backend-2.onrender.com/solve-photo",{
      method:"POST",
      body:formData
    })

    const data = await res.json()

    if(data.steps){
      onUpload(data.steps)
    }
  }

  return (
    <label style={{
      padding:"10px 16px",
      background:"#444",
      color:"white",
      cursor:"pointer"
    }}>
      Upload Homework
      <input
        type="file"
        accept="image/*"
        style={{display:"none"}}
        onChange={handleFile}
      />
    </label>
  )
}
