from bs4 import BeautifulSoup
import requests
from major_requirements import request_websites, scrape_courses
from collections import namedtuple

Course_Info = namedtuple('Course', ['name', 'units', 'description','prerequisite', 'restriction', 'ge'])

def get_courses_websites():
    """
    get_courses_websites scrapes all of the websites that can be redirected from the main UCI
    course website. 
    """

    all_websites = set()
    soup = request_websites("http://catalogue.uci.edu/allcourses/")
    for elem in soup.find_all('a'):
        get_href = elem.get('href')
        if '/allcourses' in str(get_href):
            all_websites.add('http://catalogue.uci.edu' + get_href)

    all_websites = [elem for elem in all_websites]
    return sorted(all_websites)[1:]


def get_courses(url):
    """
    get_courses takes in each invidiual website and scrape all courses provided in the url
    and their information (course id, course name, units, description, restriction, and prereq).
    All the information is organized in a dictionary: id: namedtuple(info).
    """
    course_dict = {}
    soup = request_websites(url)
    for elem in soup.find_all('div', class_='courseblock'):
        name = elem.find('p', class_='courseblocktitle').text.split('.  ')
        testing = elem.find('div', class_='courseblockdesc')
        get_info = testing.find_all('p')
        ge_tag, restrict, prereq, description = '', '', '', ''
        for x in range(len(get_info)):
            info = get_info[x].text
            ge = get_info[x].find('strong')
            if x == 0:
                description = info.replace('"', "'")
            elif 'Restriction:' in info:
                restrict = info.replace('"', "'").replace('Restriction:', '')
            elif 'Prerequisite:' in description:
                prereq = info.replace('\n', '').replace('"', "'").replace('Prerequisite:','')
            if ge is not None:
                ge_tag = ge.text.replace('.', '').upper()
        c_info = Course_Info(name[1], (name[2].split(' ')[0]), description ,prereq, restrict, ge_tag)
        course_dict[name[0].replace("\u00a0", " ")] = c_info
    return course_dict
