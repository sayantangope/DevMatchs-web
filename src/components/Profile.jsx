import { useState } from "react"
import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"
import ProfileCard from "./ProfileCard"

const Profile = () => {
  const userData = useSelector(store => store.user)
  const [livePreview, setLivePreview] = useState(null)

  return (
    <div className="min-h-screen bg-base-100 px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Edit Form */}
        <EditProfile user={userData} onUpdate={setLivePreview} />

        {/* Preview Card */}
        <ProfileCard user={livePreview || userData} />

      </div>
    </div>
  )
}
export default Profile