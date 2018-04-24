import * as History from 'history';
import { match } from 'react-router-dom';

export interface IRouteProps<MatchProps = {}> {
  history: History.History;
  match: match<MatchProps>;
  location: History.Location;
}
