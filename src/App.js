import './App.css';
import Routes from './Components/Routes/Routes';
import { useNavigate } from 'react-router-dom';
import { recognition } from "./Api/VoiceRecognition";
import { useState } from 'react';
import { Howl, Howler } from 'howler'
import homeVoice from './voiceResponse/home.mp3';
import profileVoice from './voiceResponse/profile.mp3';
import settingsVoice from './voiceResponse/settings.mp3';


function App() {
  const navigate = useNavigate();
  const [stopReco, setStopReco] = useState(false);
  const profile = new Howl({
    src:[profileVoice]
  })

  const home = new Howl({
    src:[homeVoice]
  })

  const settings = new Howl({
    src:[settingsVoice]
  })


  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    console.log(command);

    if (command.includes("go to") || command.includes("navigate to")) {
      if (command.includes("home") || command.includes("index")) {
        navigate("/home");
        home.play()
      } else if (
        command.includes("profile") ||
        command.includes("my profile")
      ) {
        navigate("/profile");
        profile.play()
      } else if (
        command.includes("settings") ||
        command.includes("settings page")
      ) {
        navigate("/settings");
        settings.play()

      } else if (command.includes("about") || command.includes("about us")) {
        // history.push("/about");
      }
    } else if (
      command.includes("stop listening") ||
      command.includes("stop recognition") ||
      command.includes("stop recognizing") ||
      command.includes("stop voice controlling") ||
      command.includes("stop voice control")
    ) {
      recognition.stop();
      setStopReco(true);
    } else if( command.includes("start listening")){
      recognition.onend = () => {
        if (!stopReco) {
          recognition.start();
        }
      };
    }
  };

  recognition.onend = () => {
    if (!stopReco) {
      recognition.start();
    }
  };
 

  Howler.volume(1.0)

  return (
    <div className="App">

      <Routes />
    </div>
  );
}

export default App;

