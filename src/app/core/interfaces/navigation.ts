import { InjectionToken } from '@angular/core';

export interface NavbarItem {
  url?: string;
  title: string;
  children?: NavbarItem[];
  icon?: any;
  permissions?: {
    only?: Array<string>;
    except?: Array<string>;
  };
}

export const NAVIGATIONS = new InjectionToken<NavbarItem[]>('Navigations');
