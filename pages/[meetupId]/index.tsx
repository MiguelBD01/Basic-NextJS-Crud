import { useRouter } from "next/router";


export default function newMeetup() {
   
    const router = useRouter();
    const pageId = router.query.meetupId;

    return (
      <div>
        <h1>New meetup item {' ' + pageId}</h1>
        <button>Click here to find out more about Item {pageId}</button>
      </div>
    );
  }
