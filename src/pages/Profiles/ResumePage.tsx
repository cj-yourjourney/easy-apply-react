import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../store/store'
import { fetchUserFullProfile } from '../../store/fullUserProfiles/fullUserProfileThunks'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { Container } from 'react-bootstrap'
import ProfileHeader from '../../components/ProfileDetails/ProfileHeader'
import SkillsList from '../../components/ProfileDetails/SkillsList'
import WorkExperienceList from '../../components/ProfileDetails/WorkExperienceList'
import EducationList from '../../components/ProfileDetails/EducationList'
import StatusDisplay from '../../components/Common/StatusDisplay'

const ResumePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.userLogin)
  const { profile, loading, error } = useSelector(
    (state: RootState) => state.fullUserProfileDetails
  )

  useEffect(() => {
    if (user?.id) dispatch(fetchUserFullProfile(user.id))
  }, [dispatch, user])

  const generatePDF = () => {
    const input = document.getElementById('resume')
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()

        const imgWidth = pdf.internal.pageSize.getWidth()
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save('resume.pdf')
      })
    }
  }

  if (loading) return <StatusDisplay loading={loading} error={error} />
  if (error) return <StatusDisplay loading={false} error={error} />
  if (!profile) return <p>No profile data available.</p>

  return (
    <Container className="my-4">
      <div id="resume" style={{ padding: '20px', fontFamily: 'Arial' }}>
        <h1>{`${profile.first_name} ${profile.last_name}`}</h1>
        <p>Phone: {profile.phone}</p>

        <h2>Skills</h2>
        <SkillsList skills={profile.skills} />

        <h2>Work Experience</h2>
        <WorkExperienceList
          workExperiences={profile.work_experiences}
          onEdit={() => {}} // Dummy edit function
          onRemove={() => {}} // Dummy remove function
        />

        <h2>Education</h2>
        <EducationList educations={profile.educations} />
      </div>
      <button onClick={generatePDF}>Download Resume as PDF</button>
    </Container>
  )
}

export default ResumePage
