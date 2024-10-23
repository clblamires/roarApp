import { Redirect, Route, useHistory } from 'react-router-dom';
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { logIn, home, school, person, calendar, peopleCircle, paw, calendarNumber } from 'ionicons/icons';
import Login from './pages/Login';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Today from './pages/Today';
import Schedule from './pages/Schedule';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import PodDetails from './pages/PodDetails';
import { AppDataProvider } from './context/appDataContext';
import { useEffect, useState } from 'react';

setupIonicReact();

const App: React.FC = () => {


	// const studentId = JSON.parse(localStorage.getItem('student') || '{}');

	const history = useHistory();
	const [ isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect( ()=> {
		const student = localStorage.getItem('student');
		if( student ){
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, [history]);



	return (
		<IonApp>
			<IonReactRouter>
				<AppDataProvider>

					{ isAuthenticated ? (
						<IonTabs>
							<IonRouterOutlet>
								<Route path="/today" component={Today} exact={true} />
								<Route path="/profile" component={Profile} exact={true} />
								<Route path="/contact" component={Contact} exact={true} />
								<Route path="/resources" component={Resources} exact={true} />
								<Route path="/schedule" component={Schedule} exact={true} />
								<Route path="/pods/:podId" component={PodDetails} exact={true} />
								<Route path="/calendar" component={Calendar} exact={true} />
								<Route exact path="/" render={() => <Redirect to="/profile" />} />
								<Route exact path="/login" render={() => <Redirect to="/today" />} />
							</IonRouterOutlet>

							<IonTabBar slot="bottom">
								{/* Today */}
								<IonTabButton tab="tab1" href="/today">
									<IonIcon aria-hidden="true" icon={home} />
									<IonLabel>Today</IonLabel>
								</IonTabButton>

								{/* Schedule */}
								<IonTabButton tab="tab2" href="/schedule">
									<IonIcon aria-hidden="true" icon={calendar}></IonIcon>
									<IonLabel>Class Schedule</IonLabel>
								</IonTabButton>


								{/* Resources */}
								{/* Temporarily removed until I can come up with a way to organize it */}
								{/* <IonTabButton tab="tab4" href="/resources">
									<IonIcon aria-hidden="true" icon={school}></IonIcon>
									<IonLabel>Resources</IonLabel>
								</IonTabButton> */}
								<IonTabButton tab="tab4" href="/calendar">
									<IonIcon aria-hidden="true" icon={calendarNumber}></IonIcon>
									<IonLabel>Calendar</IonLabel>
								</IonTabButton>

								{/* Contact */}
								<IonTabButton tab="tab5" href="/contact">
									<IonIcon aria-hidden="true" icon={peopleCircle}></IonIcon>
									<IonLabel>ROAR Staff</IonLabel>
								</IonTabButton>

								{/* Profile */}
								<IonTabButton tab="tab3" href="/profile">
									<IonIcon aria-hidden="true" icon={person}></IonIcon>
									<IonLabel>Profile</IonLabel>
								</IonTabButton>
							</IonTabBar>
						
						</IonTabs>
					) : (
						<IonRouterOutlet>
							<Route path="/login" component={Login} exact />
							<Route render={() => <Redirect to="/login" />} />
						</IonRouterOutlet>
					)}



					

				</AppDataProvider>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
