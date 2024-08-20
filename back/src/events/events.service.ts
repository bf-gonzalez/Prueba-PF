import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/events.dto';
import { EventsRepository, FormattedEvent } from './events.repository';

@Injectable()
export class EventsService {
  constructor(private readonly eventsRepository: EventsRepository) {}

  async getEvents() {
    return await this.eventsRepository.getEvents();
  }

  async getEventById(id: string) {
    return await this.eventsRepository.getEventById(id);
  }

  async createEvent(createEventDto: CreateEventDto){
    return await this.eventsRepository.createEvent(createEventDto);
  }

  async updateEvent(id: string, updateEventDto: CreateEventDto) {
    return await this.eventsRepository.updateEvent(id, updateEventDto);
  }

  async deleteEvent(id: string) {
    return await this.eventsRepository.deleteEvent(id);
  }
}