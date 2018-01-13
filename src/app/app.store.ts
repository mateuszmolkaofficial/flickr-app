import { Profile } from './interfaces/profile';

export interface AppStore {
  profiles: Array<Profile>;
  selectedProfile: Profile
}