declare module 'events' {
  type EventsList = {
    [eventName: string]: [...any[]];
  };

  export class EventEmitter<Events extends EventsList = any> {
    public emit<EventName extends keyof Events>(
      eventName: EventName,
      ...payload: Events[EventName]
    ): boolean;

    public addListener<EventName extends keyof Events>(
      eventName: EventName,
      listener: (...payload: Events[EventName]) => void,
    ): this;

    public removeListener<EventName extends keyof Events>(
      eventName: EventName,
      listener: (...payload: Events[EventName]) => void,
    ): this;

    public on<EventName extends keyof Events>(
      eventName: EventName,
      listener: (...payload: Events[EventName]) => void,
    ): this;

    public off<EventName extends keyof Events>(
      eventName: EventName,
      listener: (...payload: Events[EventName]) => void,
    ): this;

    public once<EventName extends keyof Events>(
      eventName: EventName,
      listener: (...payload: Events[EventName]) => void,
    ): this;

    public prependListener<EventName extends keyof Events>(
      eventName: EventName,
      listener: (...payload: Events[EventName]) => void,
    ): this;

    public prependOnceListener<EventName extends keyof Events>(
      eventName: EventName,
      listener: (...payload: Events[EventName]) => void,
    ): this;
  }
}
