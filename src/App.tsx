import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { nanoid } from 'nanoid';
import { Route, NavLink, Routes, useLocation } from 'react-router-dom';

import All from './routes/All';
import Active from './routes/Active';
import Completed from './routes/Completed';

import './App.css';

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []); 

    return windowWidth;
}

function NavBar() {
    let screenWidth = useWindowWidth();

    const NavUlElems: { [key: string]: MutableRefObject<HTMLLIElement | null> } = { 
        'home': useRef<HTMLLIElement>(null),
        'active': useRef<HTMLLIElement>(null),
        'completed': useRef<HTMLLIElement>(null)
    };

    let [navDecorationStyle, setNavDecorationStyle] = useState({ 
        backgroundColor: '#2f80ed',
        position: 'absolute' as const,
        left: NavUlElems['home'].current?.offsetLeft,
        width: ((NavUlElems['home'].current?.clientWidth || 0) + 1) + 'px',
        height: '4px',
        borderRadius: '4px 4px 0px 0px',
        transition: 'all 0.6s ease-in-out'
    });

    const location = useLocation();

    useEffect(() => {
        const navElemName = location.pathname.slice(1) || 'home';
        setNavDecorationStyle(prevNavDecorationStyle => ({
            ...prevNavDecorationStyle, 
            left: NavUlElems[navElemName]?.current?.offsetLeft,
            width: ((NavUlElems[navElemName].current?.clientWidth || 0) + 1) + 'px'
        }));
    }, [location, screenWidth]);

    return (
        <nav>
          <ul>
            <li ref={NavUlElems['home']}>
              <NavLink
                to="/"
                end
                className={({ isActive }) => isActive ? 'active-nav-link' : undefined}
              >
                All
              </NavLink>
            </li>
            <li ref={NavUlElems['active']}>
              <NavLink
                to="/active"
                className={({ isActive }) => isActive ? 'active-nav-link' : undefined}
              >
                Active
              </NavLink>
            </li>
            <li ref={NavUlElems['completed']}>
              <NavLink
                to="/completed"
                className={({ isActive }) => isActive ? 'active-nav-link' : undefined}
              >
                Completed
              </NavLink>
            </li>
          </ul>
          <div style={navDecorationStyle}></div>
        </nav>
    );
}

function App() {
    return (
      <div className="App">
        <header>
          <h1>#todo</h1>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<All />} />
            <Route path="/active" element={<Active />} />
            <Route path="/completed" element={<Completed/>}>
            </Route>
          </Routes>
        </main>
      </div>
    );
}

export default App;
