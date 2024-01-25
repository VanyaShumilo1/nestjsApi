import {LocationController} from "./location.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {LocationService} from "./location.service";
import {Location} from "./schemas/location.schema";
import {LocationModule} from "./location.module";
import {getModelToken} from "@nestjs/mongoose";
import {FindNearbyObjectsDto} from "./dto/find-nearby-objects.dto";

describe('LocationController', () => {
    let controller: LocationController;
    let locationService: LocationService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LocationController],
            providers: [LocationService,  { provide: getModelToken(Location.name), useValue: jest.fn() }],
        }).compile();

        controller = module.get<LocationController>(LocationController);
        locationService = module.get<LocationService>(LocationService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined()
    });

    describe('getAllLocations', () => {
        it('should return an array of locations', async () => {
            const locations: Location[] = [{
                title: "title",
                coordinates: "0.44343 0.31322",
                type: "test",
            }];
            jest.spyOn(locationService, 'getAll').mockResolvedValue(locations);

            expect(await controller.getAllLocations()).toEqual(locations);
        });
    });

    describe('getLocationById', () => {
        it('should return one location', async () => {
            const location: Location = {
                title: "title",
                coordinates: "0.44343 0.31322",
                type: "test",
            };
            jest.spyOn(locationService, 'getById').mockResolvedValue(location);

            expect(await controller.getLocationById("65b0077e04227c96fca763e4")).toEqual(location);
        });
    });

    describe('create', () => {
        it('should create a location and return the result', async () => {
            const location: Location = {
                title: "from jest",
                coordinates: `${Math.random()} ${Math.random()}`,
                type: "jest test",
            };

            const createSpy = jest
                .spyOn(locationService, 'create')
                .mockResolvedValue(location);

            const result = await locationService.create(location);

            expect(createSpy).toHaveBeenCalledWith(location);

            expect(result).toEqual(location);
        });
    });

    describe('updateById', () => {
        it('should update a location by ID and return the result', async () => {
            const id = '65b0ffa15616d93cf3bc2eb4';
            const fieldsToUpdate = { title: "updated" };
            const oldLocation: Location = {
                title: "new title 1",
                coordinates: "0.1234 0.4322",
                type: "test",
            };
            const updatedLocation = {
                ...oldLocation,
                ...fieldsToUpdate,
            }
            const findByIdAndUpdateSpy = jest
                .spyOn(locationService, 'updateById')
                .mockResolvedValue(updatedLocation);

            const result = await locationService.updateById(id, updatedLocation);

            expect(result).toEqual(updatedLocation);
        });
    });

    describe('deleteById', () => {
        it('should delete a location by ID and return the result', async () => {
            const id = '65b0ffa15616d93cf3bc2eb4';
            const deletedLocation: Location = {
                title: "new title 1",
                coordinates: "0.1234 0.4322",
                type: "test",
            };

            const findByIdAndDeleteSpy = jest
                .spyOn(locationService, 'deleteById')
                .mockResolvedValue(deletedLocation);

            const result = await locationService.deleteById(id);

            expect(result).toEqual(deletedLocation);
        });
    });

    describe('findNearbyObjects', () => {
        it('should return nearby objects according to given coordinates', async () => {
            const params: FindNearbyObjectsDto = {
                lon: 48.61299,
                lat: 22.2827,
                radius: 5000,
                object: "hospital",
                limit: 1
            }

            const result = await locationService.findNearbyObjectsByCoordinates(params);

            const expectedResult = [
                {
                    place_id: 170614726,
                    licence: "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
                    osm_type: "way",
                    osm_id: 1076019803,
                    lat: "48.6001321",
                    lon: "22.286738666810514",
                    class: "amenity",
                    type: "hospital",
                    place_rank: 30,
                    importance: 0.00000999999999995449,
                    addresstype: "amenity",
                    name: "Міська багатопрофільна клінічна лікарня",
                    display_name: "Міська багатопрофільна клінічна лікарня, вулиця Михайла Вербицького, Станційний, Ужгород, Ужгородська міська громада, Ужгородський район, Закарпатська область, 88015, Україна",
                    boundingbox: [
                        "48.5992037",
                        "48.6010518",
                        "22.2851061",
                        "22.2884703"
                    ]
                }
            ]
            expect(result).toEqual(expectedResult);
        });
    });
})
