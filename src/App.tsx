import './App.css'
import {ActivityDeserializer} from "./model/activity/activity-deserializer.ts";
import {Activity} from "./model/activity/activity.ts";
import {ActivityDto} from "./model/dto/activity/activity-dto.ts";

export default function App() {
    const raw: ActivityDto = JSON.parse('{ "type": "FOR_TIME", "comment": "Monday 250421", "activities": [], "duration": { "minutes": 1, "seconds": 0} }');

    const activity: Activity = ActivityDeserializer.deserialize( raw);


    return (
        <>
      <pre>
          {activity.type()}
      </pre>
        </>
    )
}
