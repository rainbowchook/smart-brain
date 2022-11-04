import './App.css';
import 'tachyons';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useState, useEffect, useCallback } from 'react';

function App() {
    const [input, setInput] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [box, setBox] = useState({})
    const [route, setRoute] = useState('signin')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState(
        {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined:''
        },
    )

    useEffect(() => {
        fetch(process.env.REACT_APP_SMART_BRAIN_API) // route to get users from DB for now
            .then(response => response.json())
            .then(console.log) //same as .then(data => console.log(data))
            .catch(console.log)
        console.log('current user', user.name)
        console.log('imageUrl', imageUrl)
        console.log(process.env.REACT_APP_SMART_BRAIN_API)
    }, [route, user.name, imageUrl]);

    const calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage')
        console.log('clarifaiFace', clarifaiFace)
        console.log('image', image)
        const width = Number(image.width)
        const height = Number(image.height)
        // const width = Number(image.width) * (clarifaiFace.right_col - clarifaiFace.left_col);
        // const height = Number(image.height) * (clarifaiFace.bottom_row - clarifaiFace.top_row);
        // console.log('width', width)
        // console.log('height', height)
        // const returnObject = {
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
        // console.log(returnObject)
        // return returnObject;
    }

    const displayFaceBox = (newBox) => {
        // console.log('newBox', newBox)
        setBox({...newBox})
        // console.log('box2', box)
    }

    const loadUser = (data) => {
        console.log('loadUser fn: user bfore setting', data)
        console.log('value of prevUser', user)
        // const { id, name, email, entries, joined } = data
        // setUser({
        //     id,
        //     name,
        //     email,
        //     entries,
        //     joined
        // })
        setUser({...data})
        // const newUser = {...user, ...data }
        // console.log('newUser', newUser)
        // setUser(prevUser => ({...prevUser, ...newUser}))
        // setUser({
        //     id: data.id,
        //     name: data.name,
        //     email: data.email,
        //     entries: data.entries,
        //     joined: data.joined 
        // })
        setTimeout(() => console.log('loadUser fn: user later', user), 8000)
        
    }


    // const loadUser = (user) => {
    //     setUser({...user})
    // }

    const onInputChange = (e) => {
        // console.log(e.target.value)
        setInput(e.target.value)
        // setImageUrl(e.target.value)
        // console.log(input)
    }

    const updateUserCount = async () => {
        await fetch(`${process.env.REACT_APP_SMART_BRAIN_API}/image`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: user.id
            })
        })
        .then(res => res.json())
        .then(count => {
            console.log('in updateUserCount:', count)
            // setUser({entries: count}) //user obj changed to {entries: count}!
            // const newEntries = {entries: count}
            // setUser({...user, ...newEntries})
            setUser({...user, ...{entries: count}}) // spread operator works
            // setUser(Object.assign({}, user, {entries: count}))
            // setUser(Object.assign(user, {entries: count}))
        }
        )
        .catch(error => console.log('errored out at updateUserCount fn' + error))
    }

    const onButtonSubmit = () => {
        setImageUrl(input)
        // console.log('imageUrl onButtonSubmit', imageUrl)
        // console.log('request options', requestOptions)
        // fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        fetch(`${process.env.REACT_APP_SMART_BRAIN_API}/imageurl`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input
            })
        })
        .then(response => response.json())
        .then(async (result) => {
            await updateUserCount()
            displayFaceBox(calculateFaceLocation(result))
            console.log('result ***', result)
            
        })
        // .then(result => console.log(result.outputs[0].data))
        // .then(result => console.log(result.outputs[0].data.regions))
        // .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(error => console.log('error', error));
    }

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
}, []);

const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
}, []);

const particlesOptions = {
  background: {
      color: {
          value: "#0d47a1",
      },
  },
  fpsLimit: 120,
  interactivity: {
      events: {
          onClick: {
              enable: true,
              mode: "push",
          },
          onHover: {
              enable: true,
              mode: "repulse",
          },
          resize: true,
      },
      modes: {
          push: {
              quantity: 4,
          },
          repulse: {
              distance: 200,
              duration: 0.4,
          },
      },
  },
  particles: {
      color: {
          value: "#ffffff",
      },
      links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
      },
      collisions: {
          enable: true,
      },
      move: {
          directions: "none",
          enable: true,
          outModes: {
              default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
      },
      number: {
          density: {
              enable: true,
              area: 800,
          },
          value: 80,
      },
      opacity: {
          value: 0.5,
      },
      shape: {
          type: "circle",
      },
      size: {
          value: { min: 1, max: 5 },
      },
  },
  detectRetina: true,
}

const setInitialState = () => {
    setInput('')
    setImageUrl('')
    setBox({})
    setRoute('signin')
    setIsSignedIn(false)
    setUser(
        {
            id: '',
            name: '',
            email: '',
            entries: 0,
            joined:''
        },
    )
}

// useEffect(() => {
//     setInitialState();
// }, [route])


const onRouteChange = (route) => {
    if(route === 'signout') {
        setInitialState()
        // setInput('')
        // setImageUrl('')
        // setBox({})
        // setRoute('signin')
        // setIsSignedIn(false)
        // setUser(
        //     {
        //         id: '',
        //         name: '',
        //         email: '',
        //         entries: 0,
        //         joined:''
        //     },
        // )
    } else if (route === 'home') {
        setIsSignedIn(true)
        setRoute('home')
    } else {
        setRoute(route)
    }
    
    // route === 'signin' ? setRoute('home') : (
    //     route === 'register' ? setRoute('register') : (
    //         route === 'signout' ? setRoute('signin') : setRoute('home')
            
    //     )
    // )
    
}

  return (
    <div className="App">
      <Particles
            className='particles'
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particlesOptions}
        />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        {route === 'home'
            ? 
                <>
                    <Logo />
                    <Rank name={user.name} entries={user.entries} />
                    <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
                    <FaceRecognition box={box} imageUrl={imageUrl}/>
                </>
            : (
                route === 'signin' 
                    ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
                    : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
            )
            
        }
        {/* {route === ('signin' || 'signout') && <SignIn onRouteChange={onRouteChange} /> }
        {route === 'register' && <Register onRouteChange={onRouteChange} />}
        {route === 'home' &&
            <>
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
                <FaceRecognition box={box} imageUrl={input}/>
            </>
        } */}
    </div>
  );
}

export default App;
