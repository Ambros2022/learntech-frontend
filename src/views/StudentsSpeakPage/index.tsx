import StudentsSpeakContainer from './Components/StudentsSpeakContainer'

type Props = {
  pagedata: any
  initialCards: any[]
  initialTotalPages: number
}

const StudentsSpeakPage = ({ pagedata, initialCards, initialTotalPages }: Props) => {
  return (
    <StudentsSpeakContainer
      pagedata={pagedata}
      initialCards={initialCards}
      initialTotalPages={initialTotalPages}
    />
  )
}

export default StudentsSpeakPage

