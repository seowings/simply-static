import {
    Button,
    Card,
    CardBody,
    CardHeader,
    __experimentalSpacer as Spacer,
    Notice,
    Animate,
    TextControl, SelectControl, Flex, FlexItem, TextareaControl,
} from "@wordpress/components";
import {useContext, useEffect, useState} from '@wordpress/element';
import {SettingsContext} from "../context/SettingsContext";

const {__} = wp.i18n;

function DeploymentSettings() {
    const {settings, updateSetting, saveSettings, settingsSaved, setSettingsSaved} = useContext(SettingsContext);
    const [deploymentMethod, setDeploymentMethod] = useState('zip');
    const [localPath, setLocalPath] = useState('https://');
    const [securityToken, setSecurityToken] = useState('');
    const [githubAccountType, setGithubAccountType] = useState('personal');
    const [githubVisibility, setGithubVisibility] = useState('private');
    const [githubExistingRepository, setGithubExistingRepository] = useState('no');


    const setSavingSettings = () => {
        saveSettings();
        setSettingsSaved(true);

        setTimeout(function () {
            setSettingsSaved(false);
        }, 2000);
    }

    useEffect(() => {

    }, [settings]);

    return (<div className={"inner-settings"}>
        <Card>
            <CardHeader>
                <b>{__('Deployment Settings', 'simply-static')}</b>
            </CardHeader>
            <CardBody>
                <p>{__('Choose from a variety of deployment methods. Depending on your selection we either provide a ZIP file, export to a local directory or send your files to a remote destination.', 'simply-static')}</p>
                <SelectControl
                    label={__('Deployment method', 'simply-static')}
                    value={deploymentMethod}
                    options={[
                        {label: __('ZIP Archive', 'simply-static'), value: 'zip'},
                        {label: __('Local Directory', 'simply-static'), value: 'local'},
                        {label: __('Simply CDN', 'simply-static'), value: 'simply-cdn'},
                        {label: __('GitHub', 'simply-static'), value: 'github'},
                        {label: __('Tiiny.host', 'simply-static'), value: 'tiiny'},
                        {label: __('BunnyCDN', 'simply-static'), value: 'cdn'},
                    ]}
                    onChange={(method) => {
                        setDeploymentMethod(method);
                    }}
                />
            </CardBody>
        </Card>
        <Spacer margin={5}/>
        {deploymentMethod === 'local' &&
            <Card>
                <CardHeader>
                    <b>{__('Local Directory', 'simply-static')}</b>
                </CardHeader>
                <CardBody>
                    <p>{__('This is the directory where your static files will be saved. The directory must exist and be writeable by the webserver', 'simply-static')}</p>

                    <TextControl
                        label={__('Path', 'simply-static')}
                        type={"text"}
                        placeholder={"/Users/patrickposner/Local Sites/simplystatic/app/public_static/"}
                        value={localPath}
                        onChange={(value) => {
                            setLocalPath(value);
                        }}
                    />
                </CardBody>
            </Card>
        }
        {deploymentMethod === 'simply-cdn' &&
            <Card>
                <CardHeader>
                    <b>{__('Simply CDN', 'simply-static')}</b>
                </CardHeader>
                <CardBody>
                    <p>{__('The fast and easy way to bring your static website online. Simply CDN handles hosting, performance, security and form submissions for your static site.', 'simply-static')}</p>
                    <Flex>
                        <FlexItem style={{minWidth: "90%"}}>
                            <TextControl
                                label={__('Security Token', 'simply-static')}
                                type={"text"}
                                help={"Copy and paste the Security Token from your project and click connect."}
                                value={securityToken}
                                onChange={(value) => {
                                    setSecurityToken(value);
                                }}
                            />
                        </FlexItem>
                        <FlexItem>
                            <Button variant="secondary"
                                    className={"simplycdn-connect"}>{__('Connect', 'simply-static')}</Button>
                        </FlexItem>
                    </Flex>
                </CardBody>
            </Card>
        }
        {deploymentMethod === 'github' &&
            <Card>
                <CardHeader>
                    <b>{__('GitHub', 'simply-static')}</b>
                </CardHeader>
                <CardBody>
                    <p>{__('GitHub enables you to export your static website to one of the common static hosting providers like Netlify, Cloudflare Pages or GitHub Pages.', 'simply-static')}</p>

                    <SelectControl
                        label={__('Account Type', 'simply-static')}
                        value={githubAccountType}
                        help={__('Depending on the account type the settings fields will change.', 'simply-static')}
                        options={[
                            {label: __('Personal', 'simply-static'), value: 'personal'},
                            {label: __('Organization', 'simply-static'), value: 'organization'},
                        ]}
                        onChange={(type) => {
                            setGithubAccountType(type);
                        }}
                    />

                    {githubAccountType === 'organization' &&
                        <TextControl
                            label={__('Organization', 'simply-static')}
                            type={"text"}
                            help={__('Enter the name of your organization.', 'simply-static')}
                            value={''}
                            onChange={(value) => {

                            }}
                        />
                    }
                    <TextControl
                        label={__('E-Mail', 'simply-static')}
                        type={"email"}
                        help={__('Enter your GitHub email address. This will be used to commit files to your repository.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    <TextControl
                        label={__('Personal Access Token', 'simply-static')}
                        type={"password"}
                        help={__('You need a personal access token from GitHub.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    <TextControl
                        label={__('Repository', 'simply-static')}
                        type={"text"}
                        help={__('Enter a name for your repository. This should be lowercase and without any spaces or special characters.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />
                    {githubAccountType === 'organization' &&
                        <>
                            <Notice status="warning" isDismissible={false}>
                                <p>{__('You need to create the repository manually within your organization before connecting it.', 'simply-static')}</p>
                            </Notice>
                            <Spacer margin={5}/>
                        </>
                    }
                    <SelectControl
                        label={__('Visiblity', 'simply-static')}
                        value={githubVisibility}
                        help={__('Decide if you want to make your repository public or private.', 'simply-static')}
                        options={[
                            {label: __('Public', 'simply-static'), value: 'public'},
                            {label: __('Private', 'simply-static'), value: 'private'},
                        ]}
                        onChange={(visibility) => {
                            setGithubVisibility(visibility);
                        }}
                    />

                    <TextControl
                        label={__('Branch', 'simply-static')}
                        type={"text"}
                        placeholder={"main"}
                        help={__('Simply Static automatically uses "main" as branch. You may want to modify that for example to gh-pages. for GitHub Pages.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    <div style={{display: "none"}}>
                        <SelectControl
                            label={__('Existing Repository?', 'simply-static')}
                            value={githubExistingRepository}
                            help={__('If you want to connect an existing repository (required for organizations) please activate this option.', 'simply-static')}
                            options={[
                                {label: __('Yes', 'simply-static'), value: 'yes'},
                                {label: __('No', 'simply-static'), value: 'no'},
                            ]}
                            onChange={(visibility) => {
                                setGithubExistingRepository(visibility);
                            }}
                        />
                    </div>

                    <TextControl
                        label={__('Webhook URL', 'simply-static')}
                        type={"url"}
                        help={__('Enter your Webhook URL here and Simply Static will send a POST request after all files are commited to GitHub.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    {githubAccountType === 'personal' &&
                        <>
                            <Button variant="secondary" style={{marginRight: "5px"}}
                                    className={"github-action"}>{__('Create Repository', 'simply-static')}</Button>

                            <Button variant="secondary"
                                    className={"github-action"}>{__('Delete Repository', 'simply-static')}</Button>
                        </>
                    }
                </CardBody>
            </Card>
        }
        <Spacer margin={5}/>
        {deploymentMethod === 'tiiny' &&
            <Card>
                <CardHeader>
                    <b>{__('Tiiny.host', 'simply-static')}</b>
                </CardHeader>
                <CardBody>

                    <p>{__('Deploying to Tiiny.host is the easiest and fastest deployment option available in Simply Static Pro.', 'simply-static')}</p>

                    <TextControl
                        disabled
                        label={__('E-Mail', 'simply-static')}
                        type={"text"}
                        help={__('This field is auto-filled with the e-mail address used for activating Simply Static Pro. An account will be created automatically on your first deployment.', 'simply-static')}
                        value={'hello@patrickposner.dev'}
                    />

                    <TextControl
                        label={__('Subdomain', 'simply-static')}
                        type={"text"}
                        help={__('That\'s the part before your TLD. Your full URL is the combination of the subdomain plus the domain suffix.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    <TextControl
                        label={__('Domain Suffix', 'simply-static')}
                        type={"text"}
                        help={__('This defaults to tiiny.site. If you have a custom domain configured in Tiiny.host, you can also use  that one.', 'simply-static')}
                        value={'tiiny.site'}
                        onChange={(value) => {

                        }}
                    />


                    <TextControl
                        label={__('Password Protection', 'simply-static')}
                        type={"password"}
                        help={__('Adding a password will activate password protection on your static site. The website is only visible with the password.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />
                </CardBody>
            </Card>
        }
        <Spacer margin={5}/>
        {deploymentMethod === 'cdn' &&
            <Card>
                <CardHeader>
                    <b>{__('Bunny CDN', 'simply-static')}</b>
                </CardHeader>
                <CardBody>

                    <p>{__('Bunny CDN is a fast and reliable CDN provider that you can run your static website on.', 'simply-static')}</p>

                    <TextControl
                        label={__('Bunny CDN API Key', 'simply-static')}
                        type={"password"}
                        help={__('Enter your API Key from Bunny CDN. You can find your API-Key as described here.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    <TextControl
                        label={__('Storage Host', 'simply-static')}
                        type={"text"}
                        help={__('Depending on your location, you have a different storage host. You find out which URL to use here.', 'simply-static')}
                        value={'storage.bunnycdn.com'}
                    />

                    <TextControl
                        label={__('Bunny CDN Access Key', 'simply-static')}
                        type={"password"}
                        help={__('Enter your Acess Key from Bunny CDN. You will find it within your storage zone setttings within FTP & API Access -> Password.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    <TextControl
                        label={__('Pull Zone', 'simply-static')}
                        type={"text"}
                        help={__('A pull zone is the connection of your CDN to the internet. Simply Static will try to find an existing pull zone with the provided name, if there is none it creates a new pull zone.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    <TextControl
                        label={__('Storage Zone', 'simply-static')}
                        type={"text"}
                        help={__('A storage zone contains your static files. Simply Static will try to find an existing storage zone with the provided name, if there is none it creates a new storage zone.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    <TextControl
                        label={__('Subdirectory', 'simply-static')}
                        type={"text"}
                        placeholder={'/subdirectory/'}
                        help={__('If you want to transfer the files to a specific subdirectory on your storage zone add the name of that directory here.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />

                    <TextControl
                        label={__('404 Page', 'simply-static')}
                        type={"text"}
                        placeholder={'/custom-404/'}
                        help={__('Relative path to your custom 404 page.', 'simply-static')}
                        value={''}
                        onChange={(value) => {

                        }}
                    />
                </CardBody>
            </Card>
        }
        <Spacer margin={5}/>
        {settingsSaved &&
            <Animate type="slide-in" options={{origin: 'top'}}>
                {() => (
                    <Notice status="success" isDismissible={false}>
                        <p>
                            {__('Settings saved successfully.', 'simply-static')}
                        </p>
                    </Notice>
                )}
            </Animate>
        }
        <div className={"save-settings"}>
            <Button onClick={setSavingSettings}
                    variant="primary">{__('Save Settings', 'simply-static')}</Button>
        </div>
    </div>)
}

export default DeploymentSettings;