import CurrentlyPlaying from '@components/CurrentlyPlaying';
import Container from '@components/elements/Container';
import Section from '@components/elements/Section';
import TopMusic from '@components/TopMusic';
import { Fragment, useState } from 'react';
import { Button } from '@vechaiui/react';
import { MusicType, TimeRange } from '@lib/spotify';
import { Listbox, Transition } from '@headlessui/react';

type TimeRangeOption = {
  name: string;
  value: TimeRange;
};

const timeRangeOptions: TimeRangeOption[] = [
  { name: 'Last Month', value: 'short_term' },
  { name: 'Last 6 Months', value: 'medium_term' },
  { name: 'All Time', value: 'long_term' },
];

export default function Music() {
  const [type, setType] = useState<MusicType>('tracks');
  const [timeRangeOption, setTimeRangeOption] = useState<TimeRangeOption>(
    timeRangeOptions[0]
  );

  return (
    <Container>
      <Section heading="Music">
        <p>
          I get asked a lot what kind of music I listen to and &nbsp;
          <b>I have no idea</b>. The type of music I listen to switches up a lot
          and I am not really sure how to describe it to you. So instead I
          included some data from Spotify for you to see for yourself.
        </p>
      </Section>
      <Section heading="Currently Playing">
        <CurrentlyPlaying />
      </Section>
      <Section heading={`Top of My Listens`}>
        <div className="flex flex-row items-center my-2 mb-8 space-x-12">
          <div>
            <p className="mb-2 text-sm font-bold">Type: </p>
            <div className="flex flex-row space-x-2">
              <Button
                color={type === 'tracks' ? 'primary' : undefined}
                onClick={() => setType('tracks')}
                active={type === 'tracks'}
              >
                Tracks
              </Button>
              <Button
                color={type === 'artists' ? 'primary' : undefined}
                onClick={() => setType('artists')}
                active={type === 'artists'}
              >
                Artists
              </Button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold">Time Range: </p>
            <div className="w-48">
              <Listbox value={timeRangeOption} onChange={setTimeRangeOption}>
                <div className="relative">
                  <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {timeRangeOption.name}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {timeRangeOptions.map((timeRangeOption, i) => (
                        <Listbox.Option
                          key={i}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-4 pr-4 ${
                              active
                                ? 'bg-green-100 text-green-900'
                                : 'text-gray-900'
                            }`
                          }
                          value={timeRangeOption}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {timeRangeOption.name}
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
        <TopMusic type={type} timeRange={timeRangeOption.value} />
      </Section>
    </Container>
  );
}
