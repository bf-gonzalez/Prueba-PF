import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Events } from './events.entity';
import { CreateEventDto } from './dto/events.dto';

export interface FormattedEvent extends Events {
    eventDate: string;
}

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
  ) {}

  async getEvents(): Promise<Events[]> {
    try {
      return await this.eventsRepository.find();
    } catch (error) {
      throw new Error(`Error al obtener eventos: ${error.message}`);
    }
  }

  async getEventById(id: string): Promise<Events> {
    try {
      return await this.eventsRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(`Error al obtener el evento con ID ${id}: ${error.message}`);
    }
  }

  async createEvent(createEventDto: CreateEventDto) {
    try {
      const event = this.eventsRepository.create(createEventDto);
      const savedEvent = await this.eventsRepository.save(event);

      const formattedEvent = { ...savedEvent, date: savedEvent.date.toISOString().split('T')[0] };

      return formattedEvent;
    } catch (error) {
      throw new Error(`Error al crear el evento: ${error.message}`);
    }
  }

  async updateEvent(
    id: string,
    updateEventDto: CreateEventDto,
  ): Promise<Events> {
    try {
      await this.eventsRepository.update(id, updateEventDto);
      return await this.eventsRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(`Error al actualizar el evento con ID ${id}: ${error.message}`);
    }
  }

  async deleteEvent(id: string): Promise<Events> {
    try {
      const event = await this.eventsRepository.findOneBy({ id });
      if (event) {
        await this.eventsRepository.remove(event);
        return event;
      }
      return null;
    } catch (error) {
      throw new Error(`Error al eliminar el evento con ID ${id}: ${error.message}`);
    }
  }
}