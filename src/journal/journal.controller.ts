import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalDto } from './dto/create-journal.dto';
import { UpdateJournalDto } from './dto/update-journal.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Journals')
@UseGuards(AuthGuard)
@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @ApiOperation({ summary: 'Creates a new journal entry.' })
  @ApiOkResponse({
    description: 'Journal entry has been successfully created.',
  })
  @Post()
  create(@Body() createJournalDto: CreateJournalDto, @Req() request) {
    createJournalDto.created_by = request.user.username;
    return this.journalService.create(createJournalDto);
  }

  @ApiOperation({ summary: 'Returns all journal entries for the authenticated user.' })
  @ApiOkResponse({
    description: 'Journal entries have been successfully fetched',
  })
  @Get()
  findAll(@Req() request) {
    return this.journalService.findAll(request.user.username);
  }

  @ApiOperation({ summary: 'Returns a single journal entry filtered by id.' })
  @ApiOkResponse({
    description: 'Journal entry has been successfully retrieved.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalService.findOneById(+id);
  }

  @ApiOperation({ summary: 'Updates a journal entry.' })
  @ApiOkResponse({
    description: 'Journal entry has been successfully updated.',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJournalDto: UpdateJournalDto) {
    return this.journalService.update(+id, updateJournalDto);
  }

  @ApiOperation({ summary: 'Deletes a journal entry.' })
  @ApiOkResponse({
    description: 'Journal entry has been successfully deleted.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalService.remove(+id);
  }

  @ApiOperation({ summary: 'Returns journal entries for a given category.' })
  @ApiOkResponse({
    description: 'Journal entries for the given category successfully fetched.',
  })
  @Get('categories/:category')
  findByCategory(@Param('category') category: string, @Req() request) {
    return this.journalService.findByCategory(category, request.user.username);
  }

  @ApiOperation({ summary: 'Returns journal entries for a given time period.' })
  @ApiOkResponse({
    description: 'Journal entries for the given time period successfully fetched.',
  })
  @Get('summary/:startDate')
  dateSummary(@Param('startDate') startDate: string, @Req() request) {
    return this.journalService.dateSummary(
      new Date(startDate),
      new Date(),
      request.user.username,
    );
  }
}
