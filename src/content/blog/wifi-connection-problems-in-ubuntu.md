---
title: WiFi connection problems in Ubuntu 20.04
date: 2020-08-09
tags: [ubuntu, wifi, troubleshooting]
description: Debugging a WiFi router that Ubuntu refused to connect to — and a crash course in how WiFi actually works.
---

Recently, I switched to a new WiFi provider. The connection is powered by a SIM card instead of a DSL cable. For this reason, I need a new WiFi router. However, my laptop is unable to connect to the router. It keeps asking the password for authentication even if it is correctly entered.

Initially, I thought there might be something wrong with the router itself. But the problem remains after trying to reboot the router and changing the password to a new one. I also tried to change the security protocol from WPA2 Personal to WPA, but nothing works.

It turns out that this issue only happens with my laptop that runs Ubuntu 20.04.1 LTS. The WiFi connection works perfectly on my Android phone, MacBook, and also on Windows 10.

So it is clear that the problem is about the network manager on Ubuntu. One simple thing to do is to restart the service of the network manager. After running the following command, it remains the same.

```shell
$ sudo service network-manager restart
```

## Solution

It took me almost 2 hours to try out different settings of the connection. I noticed that the router only supports the frequency band: 2.4 GHz. But I cannot find such a setting on the GUI of the network manager. By googling it, I need to set it up in the connection editor. Here are the steps:

1. Press `Alt+F2` to open the "Run a Command" box and type `nm-connection-editor`
2. Open the setting of the corresponding WiFi connection
3. Change the Band option from `Automatic` to `B/G (2.4 GHz)`

Now the WiFi works fine on my Ubuntu laptop.

I guess the reason might be that the network manager prioritizes 5 GHz over 2.4 GHz in the automatic setting.

## Geek Time!

I always believe that contextual learning is an efficient way to acquire and retain knowledge actively. So, let's start learning some basic concepts about WiFi.

### What is WiFi?

[**WiFi**](https://en.wikipedia.org/wiki/Wi-Fi) stands for **Wi**reless **Fi**delity. It is often also referred as WLAN (wireless local area network). To send and receive signals wirelessly, continuous sine waves, so-called radio waves, are the medium for such transmissions. To be precise, **radio waves** are the electromagnetic waves with the frequencies from 30 Hz to 300 GHz.

### How signal transmission works?

Suppose we want to send information from laptop to internet. First, the wireless adapter in laptop translates the data (in bytes) to a radio signal and sends it out via an antenna. Then, the wireless router receives the radio signal, decodes it, and sends the information to the internet.

To avoid interference and to allocate resources for different needs, we could specify a certain range of radio wave frequencies for a specific use. The [IEEE 802.11](https://en.wikipedia.org/wiki/IEEE_802.11) standard defines several distinct radio frequency ranges for WiFi communications.

### Frequency bands and channels

[Hertz (Hz)](https://en.wikipedia.org/wiki/Hertz) is the unit of frequency, defined as one cycle per second. Multiples are also commonly used:

- 1 Kilohertz (kHz): 10³ Hz
- 1 Megahertz (MHz): 10⁶ Hz
- 1 Gigahertz (GHz): 10⁹ Hz

For example, a radio wave with frequency of 5 GHz moves 5 billion cycles per second in the air!

A small, continuous segment of the radio spectrum frequencies is called a **radio band**. A radio band can break down into smaller segments called **channels**. For example, in the 2.4 GHz frequency band, there are 11 channels distributed within 100 MHz. Each channel is 20 MHz wide and the centers of the channels are separated by 5 MHz. There are 45 channels for the 5 GHz frequency band.

In theory, we expect a faster transmission speed from a higher frequency, because more bits of information can be encoded within a unit time interval. On the other hand, radio waves with lower frequencies more easily penetrate solid objects such as walls and doors, so they offer wider coverage. When deciding between 2.4 GHz and 5 GHz for WiFi, we need to trade off speed against coverage:

|         | Speed | Coverage |
| :-----: | :---: | :------: |
| 2.4 GHz |  ✖️   |    ✔️    |
|  5 GHz  |  ✔️   |    ✖️    |

### Interference

There are two types of interference:

1. **Adjacent-channel interference**: the adjacent channels overlap with one another.
2. **Co-channel interference**: multiple devices are competing in the same channel.

To reduce adjacent-channel interference, it can be a good idea to use non-overlapping channels. For example, the channels 1, 6, 11 are non-overlapping in 2.4 GHz. This can be simply calculated from how each channel is distributed. For 5 GHz, there are 24 non-overlapping channels. However, when there are too many devices trying to use those non-overlapping channels, it may give rise to co-channel interference. Therefore, it is preferred to use 5 GHz over 2.4 GHz when we expect a large number of wireless devices at the same time.

### Misc

It can be convenient to monitor the status of the wireless network. I found a great tool called [wavemon](https://github.com/uoaerg/wavemon) which provides information such as signal/noise levels, packet statistics, device configuration, network parameters, etc.

Run the following command to install wavemon:

```shell
$ sudo apt install wavemon
```

---

## References

[1] Marshall Brain, et al. ["How WiFi Works"](https://computer.howstuffworks.com/wireless-network.htm). HowStuffWorks
