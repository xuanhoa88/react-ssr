import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Routes } from '../../routes';
import helmet from '../../static/helmet';
import styles from './Root.module.scss';

export default function Root() {
  return (
    <div className={styles.container}>
      <Helmet {...helmet} />
      <header>
        <nav className="menu">
          <ul>
            {[
              { path: '/', label: 'Home' },
              { path: '/todos', label: 'Todo' }
            ].map((route, index) => (
              <li key={index}>
                <NavLink
                  to={route.path}
                  className={({ isActive, isPending, isTransitioning }) =>
                    classNames({
                      pending: isPending,
                      active: isActive,
                      transitioning: isTransitioning
                    })
                  }
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="content">
        <Routes />
      </main>
    </div>
  );
}
