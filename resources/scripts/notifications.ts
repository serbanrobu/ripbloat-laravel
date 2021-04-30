import { FunctionalComponent, reactive } from 'vue';
import {
  CheckCircleIcon, InformationCircleIcon, ExclamationIcon, XCircleIcon,
} from '@heroicons/vue/outline';

type NotificationOptions = {
  description?: string | FunctionalComponent;
  dismissible?: boolean;
  icon?: FunctionalComponent;
  timeout?: number;
  color?: string;
};

type Notification = NotificationOptions & {
  message: string | FunctionalComponent;
};

export const notifications = reactive<Notification[]>([]);

type NotifyFunction = (message: string | FunctionalComponent, options?: NotificationOptions) => void;

type Notify = NotifyFunction & {
  [key: string]: NotifyFunction;
}

const notifyTarget = ((message, options) => {
  notifications.push({ message, ...options });
}) as Notify;

[
  ['success', CheckCircleIcon],
  ['warning', ExclamationIcon],
  ['danger', XCircleIcon],
  ['info', InformationCircleIcon],
].forEach(([color, icon]) => {
  notifyTarget[color] = (message, options) => {
    notifications.push({
      message,
      icon,
      color,
      ...options,
    });
  };
});

export const notify = new Proxy(notifyTarget, {
  get(target, color: string) {
    return target?.[color] ?? ((message, options) => {
      notifications.push({
        message,
        color,
        ...options,
      });
    }) as NotifyFunction;
  },
});
