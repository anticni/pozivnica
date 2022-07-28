import React, {useRef} from 'react'
import {IParallax, Parallax, ParallaxLayer} from '@react-spring/parallax'
import {Fireworks} from '@fireworks-js/react'
import InviteForm from "./components/InviteForm";
import {Alert, LinearProgress, Snackbar, Stack} from "@mui/material";

export default function App() {
    const parallax = useRef<IParallax>(null!)
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [isSuccess, setSuccess] = React.useState(false);


    const handleSnackBarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBarOpen(false);
    };

    return (
        <div style={{width: '100%', height: '100%', background: '#87BCDE'}}>
            <Snackbar
                      open={snackBarOpen}
                      anchorOrigin={{
                          vertical: "top",
                          horizontal: "center"
                      }}
                      autoHideDuration={6000}
                      onClick={handleSnackBarClose}
                      onClose={handleSnackBarClose}>
                <Alert onClose={handleSnackBarClose} severity={isSuccess ? "success" : "error"}
                       sx={{width: '100%'}}>
                    {isSuccess ? 'Okej, ali javi nam ako ispaljuješ ;)' : 'Nešto je pošlo po zlu :/'}
                </Alert>
            </Snackbar>

            <Parallax ref={parallax} pages={3}>
                <ParallaxLayer offset={0} speed={0} style={{ backgroundColor: '#253237'}}/>
                <ParallaxLayer offset={0.6} speed={0.00} style={{backgroundColor: '#253237'}}/>
                <ParallaxLayer offset={1.2} speed={0} style={{backgroundColor: '#805E73'}}/>
                <ParallaxLayer offset={1} speed={1} style={{backgroundColor: '#805E73'}}/>
                <ParallaxLayer offset={2} speed={1} style={{backgroundColor: '#87BCDE'}}/>

                <ParallaxLayer
                    offset={0}
                    speed={0}
                    factor={3}
                    style={{
                        backgroundImage: "url('./stars.svg')",
                        backgroundSize: 'cover',
                    }}
                >
                    <Fireworks
                        options={{acceleration: 1, opacity: 0.3, traceSpeed: 9, trace: 1}}
                        style={{
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            position: 'fixed',
                        }}
                    />
                </ParallaxLayer>

                <ParallaxLayer offset={0.04} speed={0.2} style={{opacity: 0.8}}>
                    <img src={'./crown_manly.png'} style={{display: 'block', width: '20%', marginLeft: '13%',transform: 'rotate(-20deg)'}}/>
                </ParallaxLayer>
                <ParallaxLayer offset={0.1} speed={0.2} style={{opacity: 0.8}}>
                    <img src={'./crown_girly.png'} style={{display: 'block', width: '20%', marginLeft: '65%',transform: 'rotate(20deg)'}}/>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={0.27}
                    speed={0.1}
                    onClick={() => parallax.current.scrollTo(1)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <div style={{color: 'white', fontFamily: "'Allura', cursive", fontSize: '14vw'}}>Dijana & Nikola</div>
                </ParallaxLayer>
                <ParallaxLayer
                    offset={0}
                    speed={0.1}
                    onClick={() => parallax.current.scrollTo(1)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '10%',
                        marginBottom:'20%'
                    }}>
                    <img src={"./couple-photo.jpg"} style={{height: '50%', borderRadius: '5%', marginBottom:'15%'}}/>
                </ParallaxLayer>

                <ParallaxLayer offset={1.3} speed={0.1} style={{pointerEvents: 'none'}}>
                    <img src={'./ruzmarin.png'} style={{width: '90%', marginLeft:'5%'}} className={'ruzmarin'}/>
                </ParallaxLayer>

                <ParallaxLayer offset={1} speed={0.8} style={{opacity: 0.1}}>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '20%', marginLeft: '55%'}}/>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '10%', marginLeft: '15%'}}/>
                </ParallaxLayer>
                <ParallaxLayer offset={1.75} speed={0.5} style={{opacity: 0.1}}>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '20%', marginLeft: '70%'}}/>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '20%', marginLeft: '40%'}}/>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={0.2} style={{opacity: 0.2}}>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '10%', marginLeft: '10%'}}/>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '20%', marginLeft: '75%'}}/>
                </ParallaxLayer>
                <ParallaxLayer offset={1.6} speed={-0.1} style={{opacity: 0.4}}>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '20%', marginLeft: '60%'}}/>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '25%', marginLeft: '30%'}}/>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '10%', marginLeft: '80%'}}/>
                </ParallaxLayer>
                <ParallaxLayer offset={2.6} speed={0.4} style={{opacity: 0.6}}>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '20%', marginLeft: '5%'}}/>
                    <img src={'./cloud.svg'} style={{display: 'block', width: '15%', marginLeft: '75%'}}/>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2.5}
                    speed={-0.4}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                    }}>
                    <img src={'./earth.svg'} style={{width: '60%'}}/>
                </ParallaxLayer>

                <div style={{background: '#87BCDE'}}>
                <ParallaxLayer
                    offset={1.1}
                    speed={0.1}
                    onClick={() => parallax.current.scrollTo(2)}
                    style={{
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'left',
                    }}>
                    <div style={{textAlign: 'justify',fontSize: '20px', fontFamily: "'Cormorant SC', serif",color:'lightgray', marginLeft: '10%', marginRight: '10%', width: '95%'}}>
                        Ćao! Do devetog septembra (nadamo se) bićemo u bračnoj zajednici.
                        Tim povodom te pozivamo na proslavu:
                        <br/>
                        <br/>09.09.2022.
                        <br/>od 17:00h
                        <br/>Splav Move
                    </div>
                </ParallaxLayer>

                <ParallaxLayer offset={1.5} speed={0.1} style={{
                    marginLeft:'10%',
                    marginRight:'10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Cormorant SC', serif",color:'lightgray'
                }}>
                    <InviteForm setSuccess={setSuccess} openSnackBar={setSnackBarOpen}/>
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    speed={-0}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => parallax.current.scrollTo(0)}>
                    <div className="corner-wrapper">
                        <iframe width="100%" height="100%" frameBorder="0" scrolling="no"
                                id="gmap_canvas"
                                src="https://maps.google.com/maps?&amp;hl=en&amp;q=Move%20Belgrade%20Belgrade+(Move%20Belgrade)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"/>
                    </div>
                </ParallaxLayer>
            </div>
            </Parallax>
        </div>
    )
}
